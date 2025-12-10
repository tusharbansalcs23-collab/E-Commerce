import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "400px", height: "350px", borderRadius: "10px", objectFit: "cover" }}
      />
      <div>
        <h2>{product.name}</h2>
        <p style={{ color: "#555" }}>{product.description}</p>
        <p><b>Price:</b> ₹{product.price}</p>
        <p><b>Stock:</b> {product.stock}</p>
        <p><b>Category:</b> {product.category}</p>
      </div>
    </div>
  );
}
