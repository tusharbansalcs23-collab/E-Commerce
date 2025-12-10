import React from "react";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="card shadow-sm"
      style={{
        borderRadius: "12px",
        padding: "16px",
        width: "280px",
        backgroundColor: "#fff",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      />

      {/* NAME */}
      <h4 style={{ margin: "0 0 6px 0", fontWeight: "600" }}>
        {product.name}
      </h4>

      {/* DESCRIPTION */}
      <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
        {product.description}
      </p>

      {/* PRICE / STOCK */}
      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
        Price: ₹{product.price} • Stock: {product.stock}
      </p>

      {/* CATEGORY */}
      <p style={{ fontSize: "12px", color: "#777" }}>
        {product.category}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
