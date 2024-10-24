import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Middle = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videos = querySnapshot.docs.map(doc => doc.data());
        const uniqueCategories = [...new Set(videos.map(video => video.category))].sort();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => onCategorySelect('')}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          All Videos
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Middle;