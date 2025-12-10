import React, { useEffect, useState } from "react";
import { fetchProductById, updateProduct } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditProduct() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductById(id).then((data) => setForm(data));
  }, [id]);

  const submit = async () => {
    await updateProduct(id, form);
    navigate("/admin/products");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <input value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /><br />
      <input value={form.price || ""} onChange={(e) => setForm({ ...form, price: e.target.value })} /><br />
      <input value={form.stock || ""} onChange={(e) => setForm({ ...form, stock: e.target.value })} /><br />
      <input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /><br />
      <input value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /><br />

      <button onClick={submit}>Update</button>
    </div>
  );
}
