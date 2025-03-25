import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import "./showDetails.css";

const ShowDetails = () => {
  const {detailsData, getDetailsData}= useMovieFetchContext()
  const location= useLocation()
  const locationArray= location.pathname.split('/');

  useEffect(()=>{
    getDetailsData(location.pathname)
  },[])
  console.log(detailsData)

  return (
    <div className="sd-wrapper">
      <div className="paddings flexColStart sd-container">
        <div className="flexStart links text-red-700 font-semibold ">
          <span className="hover:text-black hover:cursor-pointer">Instagram</span>
          <span className="hover:text-black hover:cursor-pointer">Twitter</span>
          <span className="hover:text-black hover:cursor-pointer">facebook</span>
        </div>
        <div className="showItem">
          <span className="font-semibold">Status</span>
          <span>{detailsData.status}</span>
        </div>
        <div className="showItem">
          <span className="font-semibold">Original Language</span>
          <span>{detailsData.original_language}</span>
        </div>
        <div className="showItem">
          <span className="font-semibold">{locationArray[1]=='movie'? 'Budget' :'First air date'}</span>
          <span>{locationArray[1]=='movie'? parseInt(detailsData?.budget)?.toLocaleString(): detailsData?.first_air_date}</span>
        </div>
        <div className="showItem">
          <span className="font-semibold">{locationArray[1]=='movie'? 'Revenue':'Last episode date'}</span>
          <span>{locationArray[1]=='movie'? parseInt(detailsData?.revenue)?.toLocaleString(): detailsData?.last_air_date}</span>
        </div>
        <div className="key">
          <span className="keyTitle font-semibold">Keywords</span>
          <div className=" flexStart keyContent">
            {detailsData?.genres?.map((each, index)=>{
              return <span className="keywordItem" key={index}>{each.name}</span>
            })}
          </div>
        </div>
        <hr />
        <div className="showItem">
            <span>Content Score</span>
            <span>{parseFloat(detailsData?.popularity?.toFixed(1)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
