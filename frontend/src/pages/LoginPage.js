// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showWelcome, setShowWelcome] = useState(false);

  const [loggedInRole, setLoggedInRole] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);

    setShowWelcome(true); // Show welcome popup
    setTimeout(() => {
      if (res.data.role === "admin") navigate("/dashboard");
      else if (res.data.role === "manager") navigate("/locations");
      else navigate("/inventory");
    }, 2000);
  } catch (err) {
    alert("Invalid username or password");
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to WMS</h2>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {loggedInRole && (
          <p className="role-info">Logged in as: <strong>{loggedInRole}</strong></p>
        )}
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
      {showWelcome && (
  <div className="welcome-popup">
    <div className="welcome-content">
      <h3>👋 Welcome, {localStorage.getItem("name")}!</h3>
      <p>You are logged in as <strong>{localStorage.getItem("role")}</strong>.</p>
    </div>
  </div>
)}

    </div>
  );
};

export default LoginPage;
