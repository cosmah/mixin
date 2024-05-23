import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore'; // Import the necessary Firestore functions
import { Link } from 'react-router-dom';

function Vertical() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollectionRef = collection(db, 'videos'); // Use the collection function
      const snapshot = await getDocs(videoCollectionRef); // Use the getDocs function

      const videoList = [];
      snapshot.forEach((doc) => {
        const videoData = doc.data();
        videoList.push({...videoData, id: doc.id });
      });

      console.log('Fetched videos:', videoList); // Debug line
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  console.log('Rendering videos:', videos); // Debug line

  return (
    <div>
      {videos.map((video, index) => (
        <div key={video.id} className="videoCard">
          <Link to={`/player/${video.id}`}>
            <img src={video.url} alt={`Thumbnail for ${video.name}`} className="videoThumbnail" />
          </Link>
          <div className="videoInfo">
            <h3 className="videoName">{video.name}</h3>
            <p className="videoCategory">{video.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Vertical;