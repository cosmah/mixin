import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "./Likes.css";
import { db } from '../../../firebase/firebase';

function Likes({ videoId }) {
  const [likes, setLikes] = useState(0); // Initialize likes state to 0

  useEffect(() => {
    // Fetch the current number of likes from Firestore when the component is rendered
    const fetchLikes = async () => {
      const docRef = doc(db, "videos", videoId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLikes(docSnap.data().likes);
      } else {
        console.log("No such document!");
      }
    };

    fetchLikes();
  }, [videoId]);

  const handleLike = async () => {
    // Increment the number of likes in Firestore when the like button is clicked
    const docRef = doc(db, "videos", videoId);
    await updateDoc(docRef, {
      likes: likes + 1
    });

    setLikes(likes + 1);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button> {/* Like button */}
      {likes} Likes {/* Display the number of likes */}
    </div>
  );
}

export default Likes;