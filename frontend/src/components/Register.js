import React, { useState } from "react";
import { registerApi } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const result = await registerApi(email, password);

    if (result.success) {
      alert("Registered successfully!");
      navigate("/login");
    } else {
      alert(result.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button onClick={submit}>Register</button>
    </div>
  );
}
