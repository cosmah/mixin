import React, { useState, useEffect } from 'react';
import './topbar.css'; // Ensure you have this CSS file
import { Link } from 'react-router-dom';

function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = ['React', 'JavaScript', 'CSS', 'HTML']; // Example suggestions
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // replace `checkUserLoggedIn` with your actual function to check user's login status
    const userLoggedIn = checkUserLoggedIn(); 
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // Implement your search logic here
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  function checkUserLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  useEffect(() => {
    const userLoggedIn = checkUserLoggedIn(); 
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <nav className="topbar">
      <ul className="menu">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/upload">Upload</Link></li>
  { !isLoggedIn && <li><Link to="/login">Login</Link></li> }
</ul>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
        />
        {showSuggestions && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )}
        <button type="submit" className="search-button">Search</button>
      </form>
    </nav>
  );
}

export default Topbar;
