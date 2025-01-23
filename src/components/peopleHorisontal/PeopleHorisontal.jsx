import React, { useEffect, useState } from 'react'
import "./peopleHorisontal.css"
import { mockData } from '../../assets/mockData'
import { useMovieFetchContext } from '../../contexts/MovieFetchProvider'
import { useLocation } from 'react-router-dom'

const PeopleHorisontal = () => {
  const {cast, getCast,movieId}= useMovieFetchContext();
  const location= useLocation();
  useEffect(()=>{
    getCast(location.pathname)
  },[location.pathname])
  console.log(cast)

  return (
    <div className="ph-wrapper">
      <div className="innerWidth ph-title">
        Top Billed Cast
      </div>
        <div className="ph-container">
        {cast?.cast?.map(each=>{
            return(
        <div className="ph-card" key={each.id}>
            <div className="ph-cardImage">
              <img src={`https://image.tmdb.org/t/p/w500${each.profile_path}`} alt="Profile Photo Unavailable" />
            </div>

            <div className="ph-cardDetails">
              <div className="titles ph-realName">{each.name}</div>
              <div className="flexBetween flexColStart ph-cardText">
                <div className="secondaryText ph-characterName">
                  {each.character}
                </div>
                <div className="ph-role">({each.known_for_department})</div>
              </div>
            </div>
          </div>
            );
          })}
        </div>
        <hr />
    </div>
  )
}

export default PeopleHorisontal
