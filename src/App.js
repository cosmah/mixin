import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home";
import VideoGrid from './components/anime-grid/VideoGrid';
import UploadPage from './components/uploading/UploadPage'
import VideoPlayer from './components/playvideo/VideoPlayer';
import Admin from './components/admin/AdminPanel';
import { AuthProvider } from "./contexts/authContext";
import LogoutButton from './components/auth/Logout';

function App() {
 return (
    <AuthProvider>
      <Router>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<VideoGrid />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/player/:id" element={<VideoPlayer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<VideoGrid />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/logout" element={<LogoutButton />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
 );
}

export default App;












































































































// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import VideoGrid from './components/anime-grid/VideoGrid';
// import UploadPage from './components/uploading/UploadPage';
// import VideoPlayer from './components/playvideo/VideoPlayer';
// import FavoritesPage from './components/favorites/FavoritesPage';

// import Login from './components/auth/Login';
// function App() {
//  return (
//     <Router>
//       <div className="app-container">
//         <nav className="nav-bar">
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/upload">Upload</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<VideoGrid />} />
//             <Route path="/upload" element={<UploadPage />} />
//             <Route path="/favorites" element={<FavoritesPage />} />
//             <Route path="/player/:id" element={<VideoPlayer />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//  );
// }

// export default App;
