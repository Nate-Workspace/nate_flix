import React from 'react'
import "./peopleHorisontal.css"
import { mockData } from '../../assets/mockData'

const PeopleHorisontal = () => {
  return (
    <div className="ph-wrapper">
      <div className="innerWidth ph-title">
        Top Billed Cast
      </div>
        <div className="ph-container">
        {mockData.map(each=>{
            return(
        <div className="ph-card">
            <div className="ph-cardImage">
              <img src="r3.png" alt="movie" />
            </div>

            <div className="ph-cardDetails">
              <div className="titles ph-realName">Dwayne Jhonson</div>
              <div className="flexBetween flexColStart ph-cardText">
                <div className="secondaryText ph-characterName">
                  Calum drift
                </div>
                <div className="ph-role">(actor)</div>
              </div>
            </div>
          </div>
            );
          })}
        </div>
    </div>
  )
}

export default PeopleHorisontal
