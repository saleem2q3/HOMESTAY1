import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phno, setPhno] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
        if (loggedInUser) {
            setUser(loggedInUser);
            setFirstName(loggedInUser.first_name);
            setLastName(loggedInUser.last_name);
            setPhno(loggedInUser.phno);
            setEmail(loggedInUser.email);

            // Fetch profile image if logged in
            const fetchUserImage = async () => {
                try {
                    const response = await axios.get(`http://localhost:9999/profile/${loggedInUser.id}/image`, {
                        responseType: 'blob',
                        withCredentials: true,
                    });
                    const imageUrl = URL.createObjectURL(response.data);
                    setProfileImage(imageUrl);
                } catch (error) {
                    console.error('Error fetching profile image:', error);
                }
            };
            fetchUserImage();
        } else {
            setError('You must be logged in to view or update your profile.');
        }
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !phno || !email) {
            setError('Please fill out all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('phno', phno);
        formData.append('email', email);
        if (image) formData.append('profileImage', image);

        try {
            const response = await axios.put('http://localhost:9999/updateUserProfile', formData, {
                 method: 'GET',
            credentials: 'include',
            });

            if (response.status === 200) {
                setError('');
                const updatedUser = { ...user, first_name: firstName, last_name: lastName, phno, email };
                localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
                navigate('/profile'); // Navigate to the profile page
            }
        } catch (error) {
            setError('Failed to update profile. Please try again.');
        }
    };

    if (!user) {
        return <div>{error}</div>; // If no user is logged in, show an error message
    }

    return (
        <div>
            <h2>Update Profile</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phno}
                        onChange={(e) => setPhno(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" onChange={handleImageChange} />
                    {profileImage && <img src={profileImage} alt="Profile" width="100" />}
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
