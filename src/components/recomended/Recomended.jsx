import React from 'react'
import "./recomended.css"
import { mockData } from '../../assets/mockData'

const Recomended = () => {
  return (
    <div className="recommended-wrapper">
          <div className="innerWidth recommended-title">
            Top Billed Cast
          </div>
            <div className="recommended-container">
            {mockData.map(each=>{
                return(
            <div className="recommended-card">
                <div className="recommended-cardImage">
                  <img src="r3.png" alt="movie" />
                </div>
    
                <div className="recommended-cardDetails">
                    <div className="recommended-movieName">
                      Movie Name
                    </div>
                    <div className="recommended-rating">Rating</div>
                </div>
              </div>
                );
              })}
            </div>
        </div>
  )
}

export default Recomended
