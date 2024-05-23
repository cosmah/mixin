// Comments.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, doc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { auth } from '../../../firebase/firebase'; // Make sure to import auth

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memoize fetchComments using useCallback to prevent unnecessary re-renders
  const fetchComments = useCallback(async () => {
    if (!videoId) return;

    const q = query(
      collection(db, "videos", videoId, "comments"),
      orderBy("timestamp", "asc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const commentsList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id }));
    setComments(commentsList);
  }, [videoId]); // Depend on videoId

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Now fetchComments is included in the dependency array

  useEffect(() => {
    setIsAuthenticated(auth.currentUser? true : false);
  }, []); // Set isAuthenticated when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newComment.trim() ||isAuthenticated) return;

    const commentRef = doc(collection(db, "videos", videoId, "comments"));
    await addDoc(commentRef, {
      content: newComment,
      timestamp: Date.now(),
      userId: auth.currentUser.uid,
    });

    setNewComment('');
    fetchComments(); // Refresh comments list
  };

  return (
    <div>
      {!isAuthenticated? (
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
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;