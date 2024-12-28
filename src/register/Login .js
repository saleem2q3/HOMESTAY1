import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../register/Login.css';
import HOMESTAYY from '../img/image-1.png';
import BACK from '../img/back.png';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9999/userlogin', {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;
        navigate('/success', { state: { user } });
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="logg-container">
        <div className="login-container">
          <div className="form-container">
            <img src={HOMESTAYY} className="logo" alt="Logo" />
            <h1 className="form-title">Welcome Back!</h1>
            <p>Please enter your login details below.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="form-message">{error}</p>}
              <p className="forgot-password">Forgot password?</p>
              <div className="button-group">
                <button type="submit" className="form-button btn sign-up">
                  Sign In
                </button>
                <Link to="/register" className="form-button btn back-to-login">
                  Sign Up
                </Link>
              </div>
              <p className="or-text">Or continue</p>
              <Link className="google-btn">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="Google"
                />
                Log in with Google
              </Link>
            </form>
          </div>
          <div className="image-container">
            <img src={BACK} className="illustration" alt="Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
