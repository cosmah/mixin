import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import "./Likes.css";
import { db, auth } from '../../../firebase/firebase';
import { increment } from "firebase/firestore";

function Likes({ videoId }) {
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState('');
  const [hasLiked, setHasLiked] = useState(false); // New state variable

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
    fetchLikes();
  }, [fetchLikes]);

  useEffect(() => {
    const fetchUserLike = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "likes"), where("videoId", "==", videoId), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        setHasLiked(!querySnapshot.empty);
      }
    };

    fetchUserLike();
  }, [videoId]);

  const handleLike = async () => {
    if (auth.currentUser) {
      if (videoId) {
        const videoDocRef = doc(db, "videos", videoId);
        const q = query(collection(db, "likes"), where("videoId", "==", videoId), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) { // If the user hasn't liked the video yet
          await addDoc(collection(db, "likes"), {
            videoId: videoId,
            userId: auth.currentUser.uid
          });

          await updateDoc(videoDocRef, {
            likes: increment(1)
          });

          setHasLiked(true);
        } else { // If the user has already liked the video
          await deleteDoc(doc(db, "likes", querySnapshot.docs[0].id));

          await updateDoc(videoDocRef, {
            likes: increment(-1) // Decrement the number of likes by 1
          });

          setHasLiked(false);
        }

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
      <button onClick={handleLike}>{hasLiked ? 'Unlike' : 'Like'}</button>
      {likes} Likes
      <p>{message}</p>
    </div>
  );
}

export default Likes;