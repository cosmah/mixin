// src/components/topbar/top/top.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./top.css";

const Top = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  function checkUserLoggedIn() {
    const user = localStorage.getItem("user");
    return user !== null;
  }

  useEffect(() => {
    const userLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav className="topbar">
      <ul className="menu">
   
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
      <div className="profile-container">
        {isLoggedIn ? (
          <div className="profile-menu">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="profile-button"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            
            {showProfileMenu && (
              <div className="dropdown-menu">
                <Link 
                  to="/profile" 
                  className="dropdown-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="icon-margin" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            <FontAwesomeIcon icon={faUser} />
            
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Top;