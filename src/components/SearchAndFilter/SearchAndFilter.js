// VideoGrid.js

import React, { useState } from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ onSearch, onFilter, categories }) => {
 const [searchQuery, setSearchQuery] = useState('');
 const [filterOption, setFilterOption] = useState('');

 const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
 };

 const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    onFilter(e.target.value);
 };

 return (
    <div className="searchAndFilter">
      <input
        type="text"
        placeholder="Search videos..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={filterOption} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
 );
};

export default SearchAndFilter;
