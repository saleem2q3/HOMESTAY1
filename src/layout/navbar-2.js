// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import HOMESTAYY from '../img/image-1.png';
// import { FaUserCircle, FaSignOutAlt, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialUser = location.state?.user || JSON.parse(localStorage.getItem('user')) || null;

//   const [user, setUser] = useState(initialUser);
//   const [userData, setUserData] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));

//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get('http://localhost:9999/getuserDetails', {
//             withCredentials: true,
//           });
//           setUserData(response.data);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       const fetchUserImage = async () => {
//         try {
//           const response = await axios.get(`http://localhost:9999/profile/${user.id}/image`, {
//             responseType: 'blob',
//             withCredentials: true,
//           });
//           const imageUrl = URL.createObjectURL(response.data);
//           setProfileImage(imageUrl);
//         } catch (error) {
//           console.error('Error fetching user image:', error);
//         }
//       };

//       fetchUserData();
//       fetchUserImage();
//     }
//   }, [user]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:9999/logout');
//       localStorage.removeItem('user');
//       setUser(null);
//       setUserData(null);
//       setProfileImage(null);
//       setShowDropdown(false);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
//       <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
//         <div className="logo">
//           <div className="logo-image">
//             <a href="/">
//               <img src={HOMESTAYY} alt="Logo" />
//             </a>
//           </div>
//         </div>
//         <ul className="nav-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/tour">Tour</Link></li>
//           <li><Link to="/hotels">Hotels</Link></li>
//           <li><Link to="">Blog</Link></li>
//           <li><Link to="">Contact</Link></li>
//         </ul>
//         <div className="auth-section">
//           {user ? (
//             <div className="user-profile" onClick={toggleDropdown}>
//               <button className="dropdown-toggle-btn">
//                 {showDropdown ? <FaTimes /> : <FaBars />}
//               </button>
//               {showDropdown && (
//                 <div className="dropdown-menu">
//                   <div className="dropdown-header">
//                     <div className="dropdown-user-info">
//                       {profileImage ? (
//                         <img src={profileImage} alt="Profile" className="dropdown-profile-image" />
//                       ) : (
//                         <FaUserCircle size={50} />
//                       )}
//                       <span className="dropdown-user-name">
//                         {user?.first_name || 'User'} {user?.last_name || ''}
//                       </span>
//                     </div>
//                   </div>
//                   <ul>
//                     <li>
//                       <Link to="/profile">
//                         <FaUserCircle /> Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="">
//                         <FaClipboardList /> Bookings
//                       </Link>
//                     </li>
//                     <li onClick={handleLogout}>
//                       <button className="logout-btn">
//                         <FaSignOutAlt /> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="auth-buttons">
//               <Link className="login-btn" to="/login">LOGIN</Link>
//               <Link className="signup-btn" to="/register">SIGNUP</Link>
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HOMESTAYY from '../img/image-1.png';
import { FaBars, FaSignOutAlt, FaClipboardList, FaUserAlt, FaTimes, FaWindowClose } from 'react-icons/fa';
import axios from 'axios';
import Login from '../register/Login ';
import Register from '../register/register';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:9999/getuserDetails');
          if (response.data) {
            setUserDetails(response.data);
            localStorage.setItem('userDetails', JSON.stringify(response.data));
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
      localStorage.removeItem('userDetails');
      setUserDetails(null);
      navigate('/');
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
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>LOGIN</button>
              <button className="signup-btn" onClick={() => setShowSignupModal(true)}>SIGNUP</button>
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
  <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {/* Close icon inside the modal content */}
      <FaWindowClose className="modal-close-icon" onClick={() => setShowLoginModal(false)} />
      <Login /> {/* Your Login form component */}
    </div>
  </div>
)}

{showSignupModal && (
  <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {/* Close icon inside the modal content */}
      <FaWindowClose className="modal-close-icon" onClick={() => setShowSignupModal(false)} />
      <Register /> {/* Your Register form component */}
    </div>
  </div>
)}
    </div>
  );
};

export default Navbar;
