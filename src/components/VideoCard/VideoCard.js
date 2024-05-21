// VideoCard.js

import React from 'react';

const VideoCard = ({ video }) => {
 return (
    <div className="videoCard">
      <img src={video.thumbnail} alt={video.name} className="videoThumbnail" />
      <div className="videoInfo">
        <h3 className="videoName">{video.name}</h3>
        <p className="videoCategory">{video.category}</p>
      </div>
    </div>
 );
};

export default VideoCard;