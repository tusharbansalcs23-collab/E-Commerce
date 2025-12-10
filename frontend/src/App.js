import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";

import AdminProductList from "./components/AdminProductList";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminEditProduct from "./components/AdminEditProduct";

import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <Routes>

            {/* Normal User Routes */}
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route
              path="/admin/products"
              element={
                <AdminProtectedRoute>
                  <AdminProductList />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <AdminProtectedRoute>
                  <AdminAddProduct />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminProtectedRoute>
                  <AdminEditProduct />
                </AdminProtectedRoute>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
