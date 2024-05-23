import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import "./Likes.css";
import { db, auth } from '../../../firebase/firebase';

function Likes({ videoId }) {
  const [likes, setLikes] = useState(0); // Initialize likes state to 0
  const [message, setMessage] = useState(''); // Initialize message state to an empty string

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
    // Check if a user is signed in
    if (auth.currentUser) {
      // Add a new document to the likes collection with the video ID and the user ID
      const docRef = await addDoc(collection(db, "likes"), {
        videoId: videoId,
        userId: auth.currentUser.uid
      });
  
      console.log("Document written with ID: ", docRef.id);
    } else {
      // If no user is signed in, set message to ask the user to sign in
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