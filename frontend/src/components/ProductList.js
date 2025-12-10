import React, { useEffect, useState } from "react";
import { fetchProducts, fetchFiltered } from "../api";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // for search
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  // Load all products on page load
  useEffect(() => {
    fetchProducts().then((data) => {
      if (Array.isArray(data)) {
        setProducts(data);
        setAllProducts(data);
      }
    });
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );

    setProducts(filtered);
  };

  // Handle filter changes
  const handleFilter = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "") {
      setProducts(allProducts);
      return;
    }

    const filtered = await fetchFiltered(selectedCategory);
    if (Array.isArray(filtered)) {
      setProducts(filtered);
      setAllProducts(filtered);
    }
  };

  // Handle sort
  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);

    let sorted = [...products];
    if (value === "low") sorted.sort((a, b) => a.price - b.price);
    if (value === "high") sorted.sort((a, b) => b.price - a.price);

    setProducts(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {/* Filters Row */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={handleFilter}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
          <option value="Home Appliances">Home Appliances</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={handleSort}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: "8px",
            borderRadius: "6px",
            width: "220px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
