import LoadingState from "@/components/ui/LoadingState";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useMovieFetchContext } from "../../../contexts/MovieFetchProvider";
import { useTrendsContext } from "../../../contexts/TrendsContextProvider";
import "./movieBody.css";

const MovieBody = (props) => {
  const {
    homeMovies,
    getHomeMovies,
    seriesMovies,
    getSeriesMovies,
    moviesByGenre,
    seriesByGenre,
    getSeriesByGenre,
    getMoviesByGenre,
    genreIDsProvider,
    getDetailsData,
    setMovieId,
    getCast,
    getSimilarMovies,
  } = useMovieFetchContext();
  const { moviesNavValue, setMoviesNavValue } = useTrendsContext();
  const [moviesRender, setMoviesRender] = useState([]);
  const [apiProps, setApiProps] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [lastSlide, setLastSlide]= useState(false);
  const navigate= useNavigate()

  //For the loading state
  const loadingArray= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  const fetchAction = {
    Movies: { fetch: getHomeMovies, data: homeMovies },
    Series: { fetch: getSeriesMovies, data: seriesMovies },
  };

  //Detecting route changes and set navigation
  const location = useLocation();
  useEffect(() => {
    if (moviesNavValue !== "Movies" && location.pathname === "/movies") {
      setMoviesNavValue("Movies");
    } else if (moviesNavValue !== "Series" && location.pathname === "/series") {
      setMoviesNavValue("Series");
    }
  }, [location.pathname]);

  console.log(moviesNavValue)

  //For fetching the data for regular movies and series------------
  useEffect(() => {
    if(location.pathname=="/movies" && genreIDsProvider.length>0){
      getMoviesByGenre(pageNumber)
    }else if(location.pathname=="/series" && genreIDsProvider.length>0){
      getSeriesByGenre(pageNumber)
    }else{
      console.log(`Genre IDs from General: ${genreIDsProvider}`)
    const action = fetchAction[moviesNavValue] || fetchAction["Series"];
    action.fetch(pageNumber);
    }
  }, [moviesNavValue, pageNumber,genreIDsProvider]);

  // Fetch data for genres when filtering is active------------

  //For setting the data for movies Render based on The Route and Genre----------
  useEffect(() => {
    if (location.pathname === "/movies" && moviesByGenre.length > 0) {
      setMoviesRender(moviesByGenre);
    } else if (location.pathname === "/series" && seriesByGenre.length > 0) {
      setMoviesRender(seriesByGenre);
    } else {
      const action = fetchAction[moviesNavValue] || fetchAction["Series"];
      if (action.data.length > 0) {
        setMoviesRender(action.data);
      }
    }
  }, [moviesByGenre, moviesNavValue, homeMovies, seriesMovies,seriesByGenre,location.pathname]);

  //editing the api Data for the properties movie and series---------------------------------------------------
  useEffect(() => {
    if (moviesNavValue === "Movies") {
      setApiProps({ title: "title", release_date: "release_date" });
    } else if (moviesNavValue === "Series") {
      setApiProps({ title: "name", release_date: "first_air_date" });
    }
  }, [moviesNavValue]);

  //Left and Right arrow click-------------------

  const onLeftArrowClick = () => {
    if (pageNumber > 1 ) {
      setPageNumber((prevNumber) => prevNumber - 1);
    }
  };
  const onRightArrowClick = () => {
    if(lastSlide==false){
    setPageNumber((prevNumber) => prevNumber + 1);
  }
  };

  //Making the pagenumbers become one everytime a new genre is added----------
  useEffect(()=>{
    setPageNumber(1)
  },[genreIDsProvider])

  //Checking if the current slide is the last slide and Making the genre arrows functionality-------------
  useEffect(()=>{
    if(moviesRender.length<20 && moviesRender.length>0){
      setLastSlide(true)
    }else {
      setLastSlide(false); 
    }
  },[genreIDsProvider, pageNumber, moviesRender])

  
  // On each movie click-------------------- For the DETAILS page!!!!
  const onMovieClick=(id)=>{
    if(moviesNavValue=="Movies"){
    console.log('onMovieClick')
    getDetailsData(`/movie/${id}`)
    setMovieId(id)
    getCast(`/movie/${id}`)
    getSimilarMovies(`/movie/${id}`)
    navigate(`/movie/${id}`);
  } else if(moviesNavValue=="Series"){
    getDetailsData(`/tv/${id}`)
    setMovieId(id)
    getCast(`/tv/${id}`)
    getSimilarMovies(`/tv/${id}`)
    navigate(`/tv/${id}`);
  }
  }

  return (
    <div
      className={`flexColStart mbody-wrapper ${
        props.call == "routes" ? "routes" : ""
      }`}
    >
      {/* <Genre/> */}
      <div
        className={` innerWidth paddings flexCenter mbody-container ${
          props.call == "routes" ? "routes" : ""
        }`}
      >
        {(!moviesRender || moviesRender.length === 0) && (
          loadingArray.map((each) => (
            <LoadingState key={each} />
          ))
        )}
        {moviesRender.map((each) => {
          return (
            <div className="m-body-card" onClick={()=>onMovieClick(each.id)} key={each.id}>
              <div className="m-cardImage">
                <img
                  src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                  alt="Poster unavailable"
                />
              </div>

              <div className="m-cardDetails">
                <div className="titles m-cardTitle">{each[apiProps.title]}</div>
                <div className="flexBetween m-cardDetailsMini">
                  <div className="secondaryText m-releaseDate">
                    {each[apiProps.release_date]}
                  </div>
                  <div className="m-rating">{each.vote_average}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {location.pathname != "/" && (
        <div className="flexStart paddings slide-buttons">
          <button
            className={`swipers ${pageNumber == 1 ? "disabled" : ""}`}
            onClick={onLeftArrowClick}
          >
            {<FaArrowLeft size={20} />}
          </button>
          <span>{pageNumber}</span>
          <button className={`swipers ${lastSlide ? "last" : ""}`} onClick={onRightArrowClick}>
            {<FaArrowRight size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieBody;
