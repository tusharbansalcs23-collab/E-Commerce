import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../api";
import { Link } from "react-router-dom";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((p) => setProducts(p));
  }, []);

  const remove = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - Products</h2>

      <Link to="/admin/products/add">Add Product</Link>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
          <h4>{p.name}</h4>
          <button onClick={() => remove(p.id)}>Delete</button>
          <Link to={`/admin/products/edit/${p.id}`} style={{ marginLeft: "10px" }}>Edit</Link>
        </div>
      ))}
    </div>
  );
}
