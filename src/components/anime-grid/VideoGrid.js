import React, { useEffect, useState } from 'react';
import './VideoGrid.css';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter';
import Middle from "../topbar/middle/middle"; // Import the Middle component

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchVideoUrlsFromFirestore = async () => {
    const videoUrls = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));
      querySnapshot.forEach((doc) => {
        videoUrls.push({
          id: doc.id,
          url: doc.data().url,
          name: doc.data().name,
          category: doc.data().category
        });
      });
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
    return videoUrls;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const videoUrls = await fetchVideoUrlsFromFirestore();
      setVideos(videoUrls);
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesSearchQuery = !searchQuery || 
      (video.name && video.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="videoGrid">
      <div className="header">
        <h1>Video Gallery</h1>
      </div>
      <Middle onCategorySelect={setSelectedCategory} />
      <SearchAndFilter
        onSearch={setSearchQuery}
        onFilter={setSelectedCategory}
        categories={[]}  // We don't need categories here anymore since we're using Middle component
      />
      <div className="videos">
        {filteredVideos.map((video, index) => (
          <Link key={index} to={`/player/${video.id}`} className="videoCard">
            <div className="videoThumbnailContainer">
              <video
                src={video.url}
                className="videoThumbnail"
                preload="metadata"
                onLoadedMetadata={(e) => {
                  e.target.currentTime = 0.1;
                }}
              />
              <div className="playButton">
                <svg viewBox="0 0 24 24" fill="white" className="playIcon">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="videoInfo">
              <h3 className="videoName">{video.name}</h3>
              <p className="videoCategory">{video.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;