// src/components/profile/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <FontAwesomeIcon icon={faUser} className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h1>{user.name || 'User Profile'}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="info-section">
            <h2>Account Information</h2>
            <div className="info-item">
              <span>Username</span>
              <span>{user.username || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <span>Member Since</span>
              <span>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="stats-section">
            <h2>Activity Summary</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">0</div>
                <div className="stat-label">Videos Uploaded</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">0</div>
                <div className="stat-label">Total Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;