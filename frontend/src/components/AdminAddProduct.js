import React, { useState } from "react";
import { createProduct } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await createProduct(form);
    navigate("/admin/products");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Product</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} /><br />
      <input placeholder="Price" type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} /><br />
      <input placeholder="Stock" type="number" onChange={(e) => setForm({ ...form, stock: e.target.value })} /><br />
      <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} /><br />
      <input placeholder="Image URL" onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /><br />

      <button onClick={submit}>Create</button>
    </div>
  );
}
