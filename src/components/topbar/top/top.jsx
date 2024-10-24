import React, { useState, useEffect } from "react";
import "./top.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Top() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkUserLoggedIn() {
    const user = localStorage.getItem("user");
    return user !== null;
  }

  useEffect(() => {
    const userLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <nav className="topbar">
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Top;