import React, { useEffect, useState } from "react";
import { getOrders } from "../api";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>

      {orders.length === 0 ? <p>No orders found.</p> : null}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h4>Order #{order.id}</h4>
          <p>Date: {order.createdAt}</p>
          <p>Total: ₹{order.total}</p>

          <ul>
            {order.items.map((i) => (
              <li key={i.id}>
                {i.productName} — Qty: {i.quantity} — ₹{i.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
