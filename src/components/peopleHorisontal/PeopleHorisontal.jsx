import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import "./peopleHorisontal.css";
import { ClipLoader } from "react-spinners";

const PeopleHorisontal = () => {
  const { cast, getCast, setCast } = useMovieFetchContext();
  const location = useLocation();
  const loadingArray = [1,2]
  const [isLoading, setIsLoading]= useState(false)

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true)
        await getCast(location.pathname);
      } catch (error) {
        console.log("Couldn't fetch cast");
      }finally{
        setIsLoading(false)
      }
    };

    console.log(cast)

    fetchPeople();

    return () => {
      setCast([]); // Cleanup when component unmounts
    };
  }, [location.pathname]);

  console.log(cast)

  return (
    <div className="ph-wrapper">
      <div className="innerWidth ph-title">Top Billed Cast</div>
      <div className="ph-container">
        {isLoading && (
          <div className="m-auto"><ClipLoader color="#36d7b7" size={50} /></div>
        )}
        {!isLoading && ((cast?.cast?.length > 0) ? 
          cast.cast.map((each) => (
            <div className="ph-card" key={each.id}>
              <div className="ph-cardImage text-gray-500 font-light text-sm">
                <img
                  src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
                  alt="Profile Unavailable"
                />
              </div>

              <div className="ph-cardDetails">
                <div className="titles ph-realName">{each.name}</div>
                <div className="flexBetween flexColStart ph-cardText">
                  <div className="secondaryText ph-characterName">{each.character}</div>
                  <div className="ph-role">({each.known_for_department})</div>
                </div>
              </div>
            </div>
          ))
         : 
         (
          <p className="m-auto">No cast movies found</p>
        )
        )}
      </div>
      <hr />
    </div>
  );
};

export default PeopleHorisontal;
