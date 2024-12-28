import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import '../css/profile.css';
import { FiEdit } from 'react-icons/fi';
const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phno: '',
    email: '',
    profileImage: null,
    coverImage: null,
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9999/getuserDetails');
        const user = response.data;
        setUserDetails(user);

        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
          phno: user.phno,
          email: user.email,
          profileImage: null,
          coverImage: null,
        });

        const profileImageResponse = await axios.get(
          `http://localhost:9999/profile/${user.id}/image`,
          { responseType: 'blob' }
        );
        setProfileImage(URL.createObjectURL(profileImageResponse.data));

        const coverImageResponse = await axios.get(
          `http://localhost:9999/profile/${user.id}/coverImage`,
          { responseType: 'blob' }
        );
        setCoverImage(URL.createObjectURL(coverImageResponse.data));
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phno)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('first_name', formData.first_name);
    formDataObj.append('last_name', formData.last_name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phno', formData.phno);

    if (formData.profileImage) {
      formDataObj.append('profileImage', formData.profileImage);
    }

    if (formData.coverImage) {
      formDataObj.append('coverImage', formData.coverImage);
    }

    try {
      const response = await axios.put(
        'http://localhost:9999/updateUserProfile',
        formDataObj,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      alert(response.data);

      const updatedResponse = await axios.get('http://localhost:9999/getuserDetails');
      setUserDetails(updatedResponse.data);

      if (formData.profileImage) {
        const profileImageResponse = await axios.get(
          `http://localhost:9999/profile/${updatedResponse.data.id}/image`,
          { responseType: 'blob' }
        );
        setProfileImage(URL.createObjectURL(profileImageResponse.data));
      }

      if (formData.coverImage) {
        const coverImageResponse = await axios.get(
          `http://localhost:9999/profile/${updatedResponse.data.id}/coverImage`,
          { responseType: 'blob' }
        );
        setCoverImage(URL.createObjectURL(coverImageResponse.data));
      }

      setShowModal(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Profile update failed.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
    if (field === 'profileImage') {
      setProfileImage(URL.createObjectURL(file));
    } else if (field === 'coverImage') {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar /><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className="profile-container">
        <div className="cover-photo-section">
          {coverImage ? (
            <div className="cover-photo-wrapper">
              <img src={coverImage} alt="Cover" className="cover-photo" />
              <button
                className="edit-cover-btn"
                onClick={() => document.getElementById('cover-input').click()}
              >
                <FiEdit className="edit-icon" />
              </button>
              <input
                id="cover-input"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'coverImage')}
              />
            </div>
          ) : (
            <p>No cover photo available</p>
          )}
        </div>

        <div className="profile-section">
          <div className="profile-details">
            <div className="profile-image">
              {profileImage && <img src={profileImage} alt="Profile" className="profile-img" />}
            </div>
            <div className="details">
              <p>
                <strong>Name:</strong> {userDetails.first_name} {userDetails.last_name}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {userDetails.phno}
              </p>
            </div>
          </div>
          <button className="update-profile-btn" onClick={() => setShowModal(true)}>
            Update Profile
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h2>Update Profile</h2>
              {profileImage && <img src={profileImage} alt="Preview" className="profile-preview-img" />}
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phno"
                      value={formData.phno}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Profile Image:</label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={(e) => handleFileChange(e, 'profileImage')}
                  />
                  
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
