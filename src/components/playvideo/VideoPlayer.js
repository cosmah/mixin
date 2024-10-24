import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./VideoPlayer.css";
import Vertical from "./videos/vertical/Vertical";
import Comments from "../reactions/comments/Comments";
import Likes from "../reactions/likes/Likes";

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const docRef = doc(db, "videos", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setVideoData({
            id: docSnap.id,
            ...docSnap.data()
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching video: ", error);
      }
    };
    
    fetchVideoData();
  }, [id]);

  return (
    <div className="video-page">
      <div className="main-content">
        <div className="primary-content">
          <div className="video-player-wrapper">
            {videoData?.url && (
              <ReactPlayer
                url={videoData.url}
                controls
                width="100%"
                height="100%"
                className="react-player"
                playing
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />
            )}
          </div>
          
          <div className="video-info">
            <h1 className="video-title">{videoData?.name}</h1>
            <div className="video-meta">
              <span className="category">{videoData?.category}</span>
            </div>
          </div>

          <div className="video-actions">
            <Likes videoId={id} />
          </div>

          <div className="comments-section">
            <Comments videoId={id} />
          </div>
        </div>

        <div className="sidebar">
          <Vertical currentVideoId={id} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;