import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import "./recomended.css";

const Recomended = () => {
  const {
    similarMovies,
    getSimilarMovies,
    setSimilarMovies,
    getDetailsData,
    getCast,
    setMovieId,
  } = useMovieFetchContext();
  const location = useLocation();
  const locationArray = location.pathname.split("/");
  const navigate = useNavigate();
  const loadingArray = [1, 2];
  const [isLoading, setIsLoading] = useState(false);

  //The loading effect
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        setIsLoading(true);
        await getSimilarMovies(location.pathname);  // ✅ Now correctly waits for the fetch to finish
      } catch (error) {
        console.log("Can't get similar movies");
      } finally {
        setIsLoading(false); // ✅ Now only runs after movies are set
      }
    };
  
    fetchRecommended();

    return ()=>{
      setSimilarMovies([])
    }
  }, [location.pathname]);
  
  //-------------------------------------------------------

  console.log(similarMovies);

  //On movie click:
  const onMovieClick = (id) => {
    if (locationArray[1] == "movie") {
      console.log("onMovieClick");
      getDetailsData(`/movie/${id}`);
      setMovieId(id);
      getCast(`/movie/${id}`);
      getSimilarMovies(`/movie/${id}`);
      navigate(`/movie/${id}`);
    } else if (locationArray[1] == "tv") {
      getDetailsData(`/tv/${id}`);
      setMovieId(id);
      getCast(`/tv/${id}`);
      getSimilarMovies(`/tv/${id}`);
      navigate(`/tv/${id}`);
    }
  };
  return (
    <div className="recommended-wrapper">
      <div className="innerWidth recommended-title">
        {locationArray[1] == "movie" ? "Similar movies" : "Similar shows"}
      </div>
      <div className="recommended-container">
        {isLoading && ( 
          <div className="m-auto"><ClipLoader color="#36d7b7" size={50} /></div>
        )}
        {!isLoading && (!similarMovies || similarMovies?.length === 0)
          ? (
            <p className="m-auto">No similar movies found</p>
          )
          : similarMovies?.map((each, index) => {
              return (
                <div
                  className="recommended-card"
                  onClick={() => onMovieClick(each.id)}
                  key={index}
                >
                  <div className="recommended-cardImage">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                      alt="movie"
                    />
                  </div>

                  <div className="recommended-cardDetails">
                    <div className="recommended-movieName">
                      {locationArray[1] == "movie" ? each.title : each.name}
                    </div>
                    <div className="recommended-rating">
                      {each?.vote_average
                        ? parseFloat(each.vote_average.toFixed(1))
                        : "NA"}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Recomended;