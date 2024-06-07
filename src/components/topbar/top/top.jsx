import React, { useState, useEffect } from "react";
import "./top.css"; // Ensure you have this CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchAndFilter from "../../SearchAndFilter/SearchAndFilter";
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';



function Top() {
  const [videos, setVideos] = useState([]);
const [categories, setCategories] = useState([]);
 const [searchQuery, setSearchQuery] = useState(''); // State for search query
 const [filterOption, setFilterOption] = useState(''); // State for filter option
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    // replace `checkUserLoggedIn` with your actual function to check user's login status
    const userLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);

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

  function checkUserLoggedIn() {
    const user = localStorage.getItem("user");
    return user !== null;
  }

  useEffect(() => {
    const userLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <nav className="topbar">
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
      <SearchAndFilter
      onSearch={setSearchQuery}
      onFilter={setFilterOption}
      categories={categories}
    />
      <ul>
        {!isLoggedIn && (
          <li>
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
}

export default Top;