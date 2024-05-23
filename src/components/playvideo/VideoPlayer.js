// VideoPlayer.js
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./VideoPlayer.css";
import Vertical from './videos/vertical/Vertical';
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
      <div className="video-player">
        <h1>Video Player</h1>
        {videoUrl && <ReactPlayer url={videoUrl} controls />}
        <Likes videoId={id}/>
        <Comments />
      </div>
      <Vertical />
    </div>
  );
};

export default VideoPlayer;