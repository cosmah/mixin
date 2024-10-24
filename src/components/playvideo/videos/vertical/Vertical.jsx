import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Vertical.css';

function Vertical({ currentVideoId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoCollectionRef = collection(db, 'videos');
        const videoQuery = query(
          videoCollectionRef,
          where('__name__', '!=', currentVideoId),
          limit(10)
        );
        
        const snapshot = await getDocs(videoQuery);
        const videoList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [currentVideoId]);

  return (
    <div className="vertical-recommendations">
      {videos.map((video) => (
        <Link 
          key={video.id} 
          to={`/player/${video.id}`} 
          className="recommendation-card"
        >
          <div className="thumbnail-container">
            <video
              src={video.url}
              className="thumbnail"
              preload="metadata"
              onLoadedMetadata={(e) => {
                e.target.currentTime = 0.1;
              }}
            />
          </div>
          
          <div className="video-details">
            <h3 className="video-title" title={video.name}>{video.name}</h3>
            <span className="video-category">{video.category}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Vertical;