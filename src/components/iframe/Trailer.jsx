import { useMovieFetchContext } from '@/contexts/MovieFetchProvider';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const API_KEY = "7d62e932694fb115cc96edfa471eaf1a";

const Trailer = ({isTrailerOpen, trailerKey, setTrailerKey, onClose}) => {

    const { detailsData } = useMovieFetchContext();
    const location = useLocation();
    const locationArray = location.pathname.split('/');


    useEffect(() => {
        if (!detailsData) return;
        const fetchTrailer = async () => {
          try {
            const type = locationArray[1] === "movie" ? "movie" : "tv";
            const response = await fetch(
              `https://api.themoviedb.org/3/${type}/${detailsData.id}/videos?api_key=${API_KEY}`
            );
            const data = await response.json();
    
            // Find the official trailer
            const trailer = data.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          } catch (error) {
            console.error("Error fetching trailer:", error);
          }
        };
    
        fetchTrailer();

        return ()=>{
            setTrailerKey({})
        }
      }, [detailsData,location]);


      if(isTrailerOpen){
        return (
            <div className="trailer-modal">
          <div className="trailer-content">
            <button className="close-btn" onClick={onClose}>X</button>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
    </div>
        )
      }
  return null;
}

export default Trailer

// onClick={() => setIsTrailerOpen(false)}