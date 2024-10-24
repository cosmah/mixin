import React from "react";
import "./topbar.css"; // Ensure you have this CSS file
import Top from "./top/top";
import Middle from "./middle/middle";
import Bottom from "./bottom/bottom";


function Topbar() {
  return (
    <div>
      <Top/>
      <Middle/>
      {/* <Bottom/> */}
    </div>
  );
}

export default Topbar;
