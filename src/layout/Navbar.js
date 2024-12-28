import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HOMESTAYY from '../img/image-1.png';
import { FaBars, FaSignOutAlt, FaClipboardList, FaUserAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Configure axios to include credentials
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Retrieve user details from localStorage when component is mounted
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      // If no user details in localStorage, fetch from the API
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:9999/getuserDetails');
          if (response.data) {
            setUserDetails(response.data);
            localStorage.setItem('userDetails', JSON.stringify(response.data)); // Save to localStorage
          }
        } catch (error) {
          console.error('Failed to fetch user details', error);
        }
      };
      fetchUserDetails();
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9999/logout');
      localStorage.removeItem('userDetails'); // Remove from localStorage on logout
      setUserDetails(null); // Clear user details in state
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="logo">
          <div className="logo-image">
            <a href="/">
              <img src={HOMESTAYY} alt="Logo" />
            </a>
          </div>
        </div>
        <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/tour">Tour</Link></li>
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="">Blog</Link></li>
          <li><Link to="">Contact</Link></li>
        </ul>
        <div className="auth-section">
          {userDetails ? (
            <div className="user-profile" onClick={toggleDropdown}>
             <button className="dropdown-toggle-btn">
                {showDropdown ? <FaTimes /> : <FaBars />}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <img
                        className="dropdown-profile-image"
                        src={`http://localhost:9999/profile/${userDetails.id}/image`}
                        alt="Profile"
                      />
                      <span className="dropdown-user-name">{userDetails.first_name} {userDetails.last_name}</span>
                    </div>
                  </div>
                  <ul>
                    <li><Link to="/profile"><FaUserAlt /> Profile</Link></li>
                    <li><Link to="/bookings"><FaClipboardList /> Bookings</Link></li>
                    {/* <li><Link to="/dashboard"><FaBars /> Dashboard</Link></li> */}
                    <li>
                      <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link className="login-btn" to="/login">LOGIN</Link>
              <Link className="signup-btn" to="/register">
      SIGNUP
      <span className="arrow-wrapper">
        <span className="arrow"></span>
      </span>
    </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
