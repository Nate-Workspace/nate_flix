import LoadingState from "@/components/ui/LoadingState";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/hero/header/Navbar";
import { auth } from "../../config/firebase";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import { useTrendsContext } from "../../contexts/TrendsContextProvider";
import { ClipLoader } from "react-spinners";

const MyList = () => {
  const { savedMovies, getSavedMovies } = useTrendsContext();
  const { getDetailsData, setMovieId, getCast, getSimilarMovies } =
    useMovieFetchContext();
  const navigate = useNavigate();
  const [savedUserMovies, setSavedUserMovies] = useState([]);

  //Loading state---------
  const [isLoading, setIsLoading] = useState(false);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (!auth?.currentUser?.uid) {
      navigate("/");
    }
  }, [auth?.currentUser?.uid]);

  useEffect(() => {
    const savedFunction = async () => {
      try {
        setIsLoading(true);
        await getSavedMovies();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    savedFunction();
  }, []);

  useEffect(() => {
    if (savedMovies && auth?.currentUser) {
      const userMovies = savedMovies.filter(
        (each) => each.user_id === auth.currentUser.uid
      );
      setSavedUserMovies(userMovies);
    }
    if (!auth.currentUser) {
      setSavedUserMovies([]);
    }
  }, [savedMovies, auth?.currentUser]);

  //On movie Click---------------
  const onMovieClick = (id, type) => {
    console.log("Saved movie is clicked");
    getDetailsData(`/${type}/${id}`);
    setMovieId(id);
    getCast(`/${type}/${id}`);
    getSimilarMovies(`/${type}/${id}`);
    navigate(`/${type}/${id}`);
  };

  console.log(savedUserMovies);

  return (
    <div>
      <Navbar />
      <div className={`flexColStart mbody-wrapper`}>
        <div className="w-full flex flex-col gap-4 justify-center items-center pt-8">
          <span className="flex sm:gap-1 lg:gap-2 text-2xl sm: font-semibold lg:text-4xl md:text-3xl mb-[-5px]">
            <p>Your saved </p> <p className="text-red-500">Movies</p>
          </span>
          <span className="text-gray-300 mt-[-5px] text-center">
            Customize your favorite movies list as you like
          </span>
        </div>
        {/* <Genre/> */}
        <div
          className={` innerWidth paddings pt-0 flexCenter mbody-container `}
        >
          {isLoading && (
            <div className="m-auto pt-14">
              <ClipLoader color="#36d7b7" size={50} />
            </div>
          )}
          {!isLoading &&
            (savedUserMovies?.length === 0 ? (
              <p className="pt-16 m-auto">No saved movies found</p>
            ) : (
              savedUserMovies.map((each) => (
                <div
                  className="m-body-card"
                  onClick={() => onMovieClick(each.movie_id, each.type)}
                  key={each.id}
                >
                  <div className="m-cardImage">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                      alt="Poster unavailable"
                    />
                  </div>

                  <div className="m-cardDetails">
                    <div className="titles m-cardTitle">{each.title}</div>
                    <div className="flexBetween m-cardDetailsMini">
                      <div className="secondaryText m-releaseDate">
                        {each.release_date}
                      </div>
                      <div className="m-rating">{each.vote_average}</div>
                    </div>
                  </div>
                </div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;
