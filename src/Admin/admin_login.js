import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css"; // Include the updated CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:9999/adminLogin",
        { email, password },
        { withCredentials: true } // To send session cookies
      );

      if (response.status === 200) {
        navigate("/adminhome"); // Redirect to admin homepage
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="admin_login_container">
      <div className="admin_login_box">
        <h2 className="admin_login_title">Admin Login</h2>
        {error && <div className="admin_error_message">{error}</div>}
        <form onSubmit={handleLogin} className="admin_form">
          <div className="admin_form_group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="admin_form_group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin_login_button">Login</button>
          <div className="forgot_password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="signup_option">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
          <div className="google_login">
            <button className="google_button">Sign in with Google</button>
          </div>
        </form>
      </div>
      <div className="admin_illustration">
        <img
          src="https://static.vecteezy.com/system/resources/previews/020/101/791/non_2x/admin-login-blue-gradient-concept-icon-administrator-account-learning-management-system-access-abstract-idea-thin-line-illustration-isolated-outline-drawing-vector.jpg" // Update this path with the actual image location
          alt="Illustration"
          className="illustration_image"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
