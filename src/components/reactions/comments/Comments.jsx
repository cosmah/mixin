// Comments.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { auth } from "../../../firebase/firebase"; // Make sure to import auth
import './Comments.css';

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memoize fetchComments using useCallback to prevent unnecessary re-renders
  const fetchComments = useCallback(() => {
    if (!videoId) return;

    const q = query(
      collection(db, "videos", videoId, "comments"),
      orderBy("timestamp", "asc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userName: doc.data().userName, // Fetch the user's name
      }));
      setComments(commentsList);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [videoId]); // Depend on videoId

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Now fetchComments is included in the dependency array

  useEffect(() => {
    setIsAuthenticated(auth.currentUser ? true : false);
  }, []); // Set isAuthenticated when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newComment.trim() || !isAuthenticated) return;

    await addDoc(collection(db, "videos", videoId, "comments"), {
      content: newComment,
      timestamp: Date.now(),
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName, // Add the user's name
    });

    setNewComment("");
    fetchComments(); // Refresh comments list
  };

  return (
    <div>
      {!isAuthenticated ? (
        <p>Please log in to comment.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.userName}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
