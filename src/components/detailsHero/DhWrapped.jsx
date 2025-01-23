import React, { useEffect } from 'react'
import DetailsHero from './DetailsHero'
import "./DhWrapped.css"
import Navbar from "../hero/header/Navbar"
import { useLocation } from 'react-router-dom'
import { useMovieFetchContext } from '../../contexts/MovieFetchProvider'

const DhWrapped = () => {
  const location= useLocation();
  const {detailsData, getDetailsData}= useMovieFetchContext()

  useEffect(() => {
      getDetailsData(location.pathname);
    }, [location.pathname]);
  console.log(detailsData);
  return (
    <div className='wrapper-hero'>
      <img src={`https://image.tmdb.org/t/p/w500${detailsData?.backdrop_path}`} className="dh-image" alt="" />
      <div className="dh-shadow"></div>
      <Navbar />
      <DetailsHero/>
    </div>
  )
}

export default DhWrapped
