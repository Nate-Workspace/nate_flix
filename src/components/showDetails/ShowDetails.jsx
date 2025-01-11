import React from "react";
import "./showDetails.css";

const ShowDetails = () => {
  return (
    <div className="sd-wrapper">
      <div className="paddings flexColStart sd-container">
        <div className="flexStart links">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>facebook</span>
        </div>
        <div className="showItem">
          <span>Status</span>
          <span>Released</span>
        </div>
        <div className="showItem">
          <span>Original Language</span>
          <span>English</span>
        </div>
        <div className="showItem">
          <span>Budget</span>
          <span>1,345,645</span>
        </div>
        <div className="showItem">
          <span>Revenue</span>
          <span>1,534,357</span>
        </div>
        <div className="key">
          <span className="keyTitle">Keywords</span>
          <div className=" flexStart keyContent">
            <span className="keywordItem">Sequel</span>
            <span className="keywordItem">Action</span>
            <span className="keywordItem">Comedy</span>
            <span className="keywordItem">cinematic</span>
            <span className="keywordItem">thrailer</span>
          </div>
        </div>
        <hr />
        <div className="showItem">
            <span>Content Score</span>
            <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
