// =========================
// BASE URL
// =========================
const BASE = "http://localhost:8080/api";

// =========================
// AUTH APIs
// =========================
export async function loginApi(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  return data;
}

export async function registerApi(email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Registration failed");
  }

  return data;
}

// =========================
// PRODUCTS
// =========================
export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  return res.json();
}

export async function fetchFiltered(category, sort) {
  const url = new URL(`${BASE}/products/filter`);
  if (category) url.searchParams.append("category", category);
  if (sort) url.searchParams.append("sort", sort);

  const res = await fetch(url);
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  return res.json();
}

// =========================
// PLACE ORDER (FIXED)
// =========================
export async function placeOrder(orderData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(orderData),
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Server returned empty JSON");
  }

  if (!res.ok) {
    throw new Error(data.message || "Order failed");
  }

  return data;
}

// =========================
// USER ORDER HISTORY
// =========================
export async function getOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/orders/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Server returned empty JSON");
  }

  if (!res.ok) throw new Error(data.message || "Failed to load orders");

  return data;
}

// =========================
// ADMIN PRODUCT MANAGEMENT
// =========================
export async function createProduct(product) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Product creation failed");
  }

  return data;
}

export async function updateProduct(id, product) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Product update failed");
  }

  return data;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Delete failed");

  return true;
}
