import React, { useEffect, useState } from 'react';

import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';


function Vertical() {
  const [videos, setVideos] = useState([]);
const [categories, setCategories] = useState([]);
 const [searchQuery, setSearchQuery] = useState(''); // State for search query
 const [filterOption, setFilterOption] = useState(''); // State for filter option

 const fetchVideoUrlsFromFirestore = async () => {
    const videoUrls = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));
      querySnapshot.forEach((doc) => {
        videoUrls.push({ id: doc.id, url: doc.data().url, name: doc.data().name, category: doc.data().category });
      });
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
    return videoUrls;
 };

 useEffect(() => {
    const fetchVideosAndCategories = async () => {
      const videoUrls = await fetchVideoUrlsFromFirestore();
      setVideos(videoUrls);

      // Extract unique categories
      const uniqueCategories = [...new Set(videoUrls.map(video => video.category))];
      setCategories(uniqueCategories);
    };

    fetchVideosAndCategories();
 }, []);

 // Filter videos based on search query and filter option
 const filteredVideos = videos.filter(video => {
  const matchesSearchQuery = !searchQuery || (video.name && video.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchesFilterOption = !filterOption || video.category === filterOption;
  return matchesSearchQuery && matchesFilterOption;
});

  return (
    <div>
    <h1>Similar Videos</h1>
    </div>
  );
}

export default Vertical;
