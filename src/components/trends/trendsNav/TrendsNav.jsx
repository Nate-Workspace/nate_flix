import React, { useState } from "react";
import "./trendsNav.css";
import { FaArrowTrendUp, FaFire, FaPlus, Fa42Group } from "react-icons/fa6";

import { useTrendsContext } from "../../../contexts/TrendsContextProvider";

const TrendsNav = () => {
  const {trendsNavValue,setTrendsNavValue}= useTrendsContext()
  
  
  //Listening the click of the Navigation--------
  const onNavClick = (active) => {
    setTrendsNavValue(active)
  };

  
  return (
    <div className="trends-wrapper">
      <div className="innerWidth paddings trends-container">
        <div className=" flexCenter trend-tabs">
          <div className={`item ${trendsNavValue== "Trending" ? "active": ""}`} onClick={()=> onNavClick("Trending")}>
            <FaArrowTrendUp size={14} />
            <span>Trending</span>
          </div>
          <div className={`item ${trendsNavValue== "Popular" ? "active": ""}`} onClick={()=> onNavClick("Popular")}>
            <FaFire size={20} />
            <span>Popular</span>
          </div>
          <div className={`item ${trendsNavValue== "TopRated" ? "active": ""}`} onClick={()=> onNavClick("TopRated")}>
            <FaPlus size={20} />
            <span>Top Rated</span>
          </div>
          <div className={`item ${trendsNavValue== "Upcoming" ? "active": ""}`} onClick={()=> onNavClick("Upcoming")}>
            <Fa42Group size={20} />
            <span>Upcoming</span>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default TrendsNav;
