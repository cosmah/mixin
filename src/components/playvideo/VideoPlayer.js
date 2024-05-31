// VideoPlayer.js
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
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams(); // Access the video ID from the URL
  useEffect(() => {
    console.log("Video ID:", id);
    const fetchVideoUrl = async () => {
      try {
        const docRef = doc(db, "videos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideoUrl(docSnap.data().url);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching video URL: ", error);
      }
    };

    fetchVideoUrl();
  }, [id]);

  return (
    <div className="grid-container">
      <div className="video-player-container">
        <div className="scrollable-video-container">
          <div className="video-player">
            {videoUrl && (
              <ReactPlayer url={videoUrl} controls className="react-player" />
            )}
          </div>
        </div>
        <div className="video-reactions">
          <Likes videoId={id} />
          <Comments videoId={id} />
        </div>
      </div>
      <div className="vertical-container">
        <div className="scrollable-vertical-container">
          <Vertical />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
