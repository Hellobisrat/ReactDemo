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

