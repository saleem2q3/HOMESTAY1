import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/adminhome.css";

const AdminHomepage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9999/adminLogout");
      navigate("/admin"); // Redirect to the admin page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav className="admin_navbar">
        <div className="navbar_brand">Admin Dashboard</div>
        <div className="navbar_links">
          <button className="logout_button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="admin_container">
        <h1></h1>
      </div>
    </div>
  );
};

export default AdminHomepage;
