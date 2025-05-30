import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import Navbar from "../hero/header/Navbar";
import DetailsHero from "./DetailsHero";
import "./DhWrapped.css";

const DhWrapped = () => {
  const location = useLocation();
  const { detailsData, getDetailsData, setDetailsData } =
    useMovieFetchContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailsHero = async () => {
      try {
        setIsLoading(true);
        await getDetailsData(location.pathname);
      } catch (error) {
        console.error("Error Displaying Details hero");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsHero();

    return () => {
      setDetailsData({});
    };
  }, [location.pathname]);

  console.log(detailsData);

  return (
    <div className="wrapper-hero">
      {!isLoading && (
        <img
        src={`https://image.tmdb.org/t/p/w500${detailsData?.backdrop_path}`}
        className="dh-image"
        alt=""
      />
      )}   
      <div className="dh-shadow"></div>
      <Navbar />
      <DetailsHero isLoading={isLoading} />
    </div>
  );
};

export default DhWrapped;
