import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminRoute from "./routes/AdminRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "sonner";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSucess";
import OrdersPage from "./pages/OrdersPage";

// Correct lazy import
const ProductDetail = React.lazy(() => import("./pages/ProductDetails"));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster richColors position="top-right" />
      <Navbar />

      <div className="flex-grow">
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrdersPage />} />

            <Route
              path="/admin/products/new"
              element={
                <AdminRoute>
                  <AdminAddProduct />
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
