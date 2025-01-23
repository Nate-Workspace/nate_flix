import React, { useEffect, useState } from "react";
import "./showDetails.css";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import { useLocation } from "react-router-dom";

const ShowDetails = () => {
  const {detailsData, getDetailsData}= useMovieFetchContext()
  const location= useLocation()
  const locationArray= location.pathname.split('/');

  useEffect(()=>{
    getDetailsData(location.pathname)
  },[])
  console.log(detailsData)

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
          <span>{detailsData.status}</span>
        </div>
        <div className="showItem">
          <span>Original Language</span>
          <span>{detailsData.original_language}</span>
        </div>
        <div className="showItem">
          <span>{locationArray[1]=='movie'? 'Budget' :'First air date'}</span>
          <span>{locationArray[1]=='movie'? parseInt(detailsData?.budget)?.toLocaleString(): detailsData?.first_air_date}</span>
        </div>
        <div className="showItem">
          <span>{locationArray[1]=='movie'? 'Revenue':'Last episode date'}</span>
          <span>{locationArray[1]=='movie'? parseInt(detailsData?.revenue)?.toLocaleString(): detailsData?.last_air_date}</span>
        </div>
        <div className="key">
          <span className="keyTitle">Keywords</span>
          <div className=" flexStart keyContent">
            {detailsData?.genres?.map((each, index)=>{
              return <span className="keywordItem" key={index}>{each.name}</span>
            })}
          </div>
        </div>
        <hr />
        <div className="showItem">
            <span>Content Score</span>
            <span>{parseFloat(detailsData?.popularity?.toFixed(1)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
