import React, { useEffect, useState } from 'react';
import './VideoGrid.css';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

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
    const fetchVideosAndCategories = async () => {
      const videoUrls = await fetchVideoUrlsFromFirestore();
      setVideos(videoUrls);
      const uniqueCategories = [...new Set(videoUrls.map(video => video.category))];
      setCategories(uniqueCategories);
    };
    fetchVideosAndCategories();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesSearchQuery = !searchQuery || (video.name && video.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilterOption = !filterOption || video.category === filterOption;
    return matchesSearchQuery && matchesFilterOption;
  });

  return (
    <div className="videoGrid">
      <div className="header">
        <h1>Video Gallery</h1>
      </div>
      <SearchAndFilter
        onSearch={setSearchQuery}
        onFilter={setFilterOption}
        categories={categories}
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
                  // Set the current time to 0.1 to show a frame from the video
                  e.target.currentTime = 0.1;
                }}
              />
              <div className="playButton">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="playIcon"
                >
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