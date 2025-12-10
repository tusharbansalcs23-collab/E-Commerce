import React, { useState } from "react";
import { loginApi } from "../api";
import { jwtDecode } from "jwt-decode";  // ✅ Correct named import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginApi(email, password);

    if (res.success) {
      // Decode JWT → extract email & role
      const decoded = jwtDecode(res.token);

      // Store login data
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", decoded.sub); // email
      localStorage.setItem("role", decoded.role); // USER or ADMIN

      alert("Login successful!");
      window.location.href = "/"; // redirect to home
    } else {
      alert(res.message || "Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};
