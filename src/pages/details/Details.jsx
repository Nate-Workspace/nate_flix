import DhWrapped from "../../components/detailsHero/DhWrapped";
import PeopleHorisontal from "../../components/peopleHorisontal/PeopleHorisontal";
import Recomended from "../../components/recomended/Recomended";
import ShowDetails from "../../components/showDetails/ShowDetails";
import "./details.css";
const Details = () => {
  return (
    <div className="details-wrapper">
      <DhWrapped />
      <div className="flex lg:justify-start sm:flex-col lg:items-start lg:flex-row md:flex-col paddings innerWidth items-start justify-between gap-8 details-container">
        <div className="lg:w-3/4 md:w-full horizontals">
          <PeopleHorisontal />
          <Recomended />
        </div>
        <div className="flex flex-col gap-4 lg:w-1/5 pt-8 md:w-full md:pt-0 md:mb-10 movieAnalytics">
        <p className="text-xl font-semibold">Movie Analytics</p>
          <ShowDetails />
        </div>
      </div>
    </div>
  );
};

export default Details;
