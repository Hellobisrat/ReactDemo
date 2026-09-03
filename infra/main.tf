terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"   # ← latest stable v2.x
    }
  }
}



provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}



resource "helm_release" "reactdemo" {
  name       = "reactdemo"
  chart      = "../reactdemo-chart"
  namespace  = kubernetes_namespace.demo.metadata[0].name
}


resource "kubernetes_namespace" "demo" {
  metadata {
    name = "demo"
  }
}

resource "kubernetes_config_map" "reactdemo_config" {
  metadata {
    name      = "reactdemo-config"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  data = {
    APP_NAME = "ReactDemo"
    ENV      = "development"
  }
}

resource "kubernetes_secret" "reactdemo_secret" {
  metadata {
    name      = "reactdemo-secret"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  type = "Opaque"

  data = {
    MONGO_URI = base64encode("mongodb://mongo:27017/bookdb")
    JWT_SECRET = base64encode("mysupersecretkey123")
  }
}


resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace.demo.metadata[0].name
    labels = {
      app = "frontend"
    }
  }

  spec {
    replicas = 2  # you can change this later

    selector {
      match_labels = {
        app = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "bisrat1/reactdemo-frontend:v12"   # replace with real image

          port {
            container_port = 80             # replace with your .Values.frontend.port
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  spec {
    selector = {
      app = "frontend"
    }

    port {
      port        = 80        # same as frontend.port
      target_port = 80
    }

    type = "NodePort"
  }
}
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.demo.metadata[0].name
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = 2  # you can change this later

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = "bisrat1/reactdemo-backend:v12"   # MUST be a string

          port {
            container_port = 8000                   # replace with your backend port
          }

          env {
            name  = "PORT"
            value = "8000"
          }

          env {
            name  = "MONGO_URI"
            value = "mongodb://mongo:27017/bookdb"
          }

          env {
            name = "JWT_SECRET"

            value_from {
              secret_key_ref {
                name = "reactdemo-secret"
                key  = "JWT_SECRET"
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  spec {
    selector = {
      app = "backend"
    }

    port {
      port        = 8000
      target_port = 8000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_ingress_v1" "reactdemo_ingress" {
  metadata {
    name      = "reactdemo-ingress"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  spec {
    rule {
      host = "demo.local"

      http {
        path {
          path      = "/api"        # replace with your .Values.ingress.apipath
          path_type = "Prefix"

          backend {
            service {
              name = "backend"
              port {
                number = 8000       # backend port
              }
            }
          }
        }

        path {
          path      = "/"           # replace with your .Values.ingress.frontendpath
          path_type = "Prefix"

          backend {
            service {
              name = "frontend"
              port {
                number = 80       # frontend port
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mongo_pvc" {
  metadata {
    name      = "mongo-pvc"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "1Gi"   # replace with your .Values.mongo.pvcSize
      }
    }
  }
}

resource "kubernetes_deployment" "mongo" {
  metadata {
    name      = "mongo"
    namespace = kubernetes_namespace.demo.metadata[0].name
    labels = {
      app = "mongo"
    }
  }

  spec {
    replicas = 1   # replace with .Values.mongo.replicas

    selector {
      match_labels = {
        app = "mongo"
      }
    }

    template {
      metadata {
        labels = {
          app = "mongo"
        }
      }

      spec {
        container {
          name  = "mongo"
          image = "mongo:6"   # replace with your .Values.mongo.image

          port {
            container_port = 27017   # replace with your .Values.mongo.port
          }

          volume_mount {
            name       = "mongo-storage"
            mount_path = "/data/db"
          }
        }

        volume {
          name = "mongo-storage"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.mongo_pvc.metadata[0].name
          }
        }
      }
    }
  }
}
resource "kubernetes_service" "mongo" {
  metadata {
    name      = "mongo"
    namespace = kubernetes_namespace.demo.metadata[0].name
  }

  spec {
    selector = {
      app = "mongo"
    }

    port {
      port        = 27017
      target_port = 27017
    }

    type = "ClusterIP"
  }
}







