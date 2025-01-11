import React from "react";
import "./details.css";
import DhWrapped from "../../components/detailsHero/DhWrapped";
import PeopleHorisontal from "../../components/peopleHorisontal/PeopleHorisontal";
import ShowDetails from "../../components/showDetails/ShowDetails";
import Recomended from "../../components/recomended/Recomended";
const Details = () => {
  return (
    <div className="details-wrapper">
      <DhWrapped />
      <div className="flexStart paddings innerWidth detailsBody">
        <div className="db-left">
          <PeopleHorisontal />
          <Recomended />
        </div>
        <div className="db-right">
          <ShowDetails />
        </div>
      </div>
    </div>
  );
};

export default Details;
