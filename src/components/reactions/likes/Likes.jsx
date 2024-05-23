import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import "./Likes.css";
import { db, auth } from '../../../firebase/firebase';
import { increment } from "firebase/firestore";

function Likes({ videoId }) {
  const [likes, setLikes] = useState(0); // Initialize likes state to 0
  const [message, setMessage] = useState(''); // Initialize message state to an empty string

  // Memoize fetchLikes using useCallback to prevent unnecessary re-renders
  const fetchLikes = useCallback(async () => {
    if (videoId && typeof videoId === 'string' && videoId.trim()!== '') {
      const docRef = doc(db, "videos", videoId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLikes(docSnap.data().likes);
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("Invalid videoId. Please check the videoId value.");
    }
  }, [videoId]); // Depend on videoId

  useEffect(() => {
    // Call fetchLikes when the component mounts or videoId changes
    fetchLikes();
  }, [fetchLikes]); // Now fetchLikes is included in the dependency array

  const handleLike = async () => {
    if (auth.currentUser) {
      if (videoId) {
        const docRef = await addDoc(collection(db, "likes"), {
          videoId: videoId,
          userId: auth.currentUser.uid
        });

        const videoDocRef = doc(db, "videos", videoId);
        await updateDoc(videoDocRef, {
          likes: increment(1) // Increment the number of likes by 1
        });

        console.log("Document written with ID: ", docRef.id);
        // Re-fetch the likes count after successfully liking a video
        fetchLikes();
      } else {
        setMessage("Invalid videoId. Please check the videoId value.");
      }
    } else {
      setMessage("Please sign in to like videos.");
    }
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button> {/* Like button */}
      {likes} Likes {/* Display the number of likes */}
      <p>{message}</p> {/* Display the message */}
    </div>
  );
}

export default Likes;