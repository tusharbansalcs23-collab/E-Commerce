import React from "react";
import { useCart } from "../contexts/CartContext";
import { placeOrder } from "../api";

export default function Cart() {
  const { cart, removeFromCart, setCart } = useCart();

  // 🔐 PROTECT CART PAGE
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderRequest = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.qty,
      })),
    };

    try {
      const res = await placeOrder(orderRequest);
      alert("Order placed successfully!");
      setCart([]); // clear cart
    } catch (err) {
      // 🧹 Clean backend error message
      let msg = err.message
        .replace("Order failed: Order failed:", "")
        .replace("Order failed:", "")
        .replace("java.lang.RuntimeException:", "")
        .trim();

      alert(msg);
    }
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Your Cart</h2>

      {cart.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <div>
            <strong>{p.name}</strong> <br />
            Qty: {p.qty} • ₹{p.price}
          </div>

          <button
            onClick={() => removeFromCart(p.id)}
            style={{
              padding: "6px 12px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      {cart.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          style={{
            padding: "10px 16px",
            width: "100%",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Place Order
        </button>
      )}
    </div>
  );
}
