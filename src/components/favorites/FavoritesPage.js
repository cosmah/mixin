// FavoritesPage.js

import React from 'react';
import './FavoritesPage.css'; // Import the CSS module
import VideoCard from '../VideoCard/VideoCard'; // Assuming you have a VideoCard component

const FavoritesPage = () => {
 // Static data for favorite videos
 const favorites = [
    { id: '1', name: 'Video 1', category: 'Action', thumbnail: 'path/to/thumbnail1.jpg' },
    { id: '2', name: 'Video 2', category: 'Comedy', thumbnail: 'path/to/thumbnail2.jpg' },
    { id: '3', name: 'Video 3', category: 'Drama', thumbnail: 'path/to/thumbnail3.jpg' },
    // Add more videos as needed
 ];

 return (
    <div className="favoritesPage">
      <h1>My Favorite Videos</h1>
      <div className="favoritesGrid">
        {favorites.map((favorite, index) => (
          <VideoCard key={index} video={favorite} />
        ))}
      </div>
    </div>
 );
};

export default FavoritesPage;