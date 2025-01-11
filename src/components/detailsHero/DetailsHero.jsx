import React from "react";
import "./detailsHero.css";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const DetailsHero = () => {
  return (
    <div className="dh-wrapper">
      <div className="flexStart paddings innerWidth dh-container">
      
        {/* Hero left */}
        <div className="dh-left">
          <img src="r2.png" alt="movie poster" />
        </div>

        {/* Hero right  */}
        <div className="flexColStart dh-right">
          {/* Header Name---------- */}
          <div className="dh-header">
            <div className="dh-header-Name">
              <span className="primaryTitle">Small Things Like These</span>
              <span className="">(2024)</span>
            </div>
            <div className="flexStart dh-header-smallName">
              <span>11/01/2024</span>
              <span>Drama, History</span>
              <span>1hr 39m</span>
            </div>
          </div>

          {/* div Rating */}
          <div className="dh-rating">
            <span>User Score: </span>
            <span>70%</span>
          </div>

          {/* Call to actions------- */}
          <div className="flexStart dh-buttons">
            <span>
              <FaPlay size={15} />
            </span>
            <span>
              <FaHeart size={15} />
            </span>
            <span>
              <FaBookmark size={15} />
            </span>
          </div>

          {/* Overview */}
          <div className="flexColStart dh-overview">
            <span>Overview</span>
            <span>
              Everytime I come a nigga gotta set it then I gotta go and then I
              gotta get it then I gotta glow and...
            </span>
          </div>

          {/* Roles */}
          <div className="flexStart dh-roles">
            <div className="flexColStart dh-role-item">
              <span>Director</span>
              <span>Someone</span>
            </div>
            <div className="flexColStart dh-role-item">
              <span>Main actor</span>
              <span>Some other one</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
