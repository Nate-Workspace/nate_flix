import React, { useEffect, useState } from "react";
import "./genre.css";
import { useTrendsContext } from "../../../contexts/TrendsContextProvider";
import { useMovieFetchContext } from "../../../contexts/MovieFetchProvider";
import { useLocation } from "react-router-dom";
// import { Result } from "postcss";
//THERE IS A BUG HERE IN THE CSS!!!!!!!!!!!!!!!!!!--------------------

const Genre = (props) => {

  const {genreList,getGenreList}= useTrendsContext();
  const {getMoviesByGenre,setGenreIDsProvider, getSeriesByGenre}= useMovieFetchContext()
  const [updatedGenreList, setUpdatedGenreList]= useState([])
  const [genreIDs, setGenreIDs]= useState({})
  const [forceRender, setForceRender] = useState(false);
  const location= useLocation().pathname;

  //Getting the genre list from the API--------------------
  useEffect(()=>{
    if(location=="/movies"){
    getGenreList("movie")
  }else if(location=="/series"){
    getGenreList("tv")
  }
  },[])
  
  //Updating the genre list to another array------------------
  useEffect(()=>{
    if(genreList.length>0){
      setUpdatedGenreList(genreList.map(each=>{
        return {...each, on:false}
      }))
    }
  },[genreList])
  console.log(updatedGenreList)

  //Handling the onGenreClick
  const onGenreClick= (id)=>{
    setUpdatedGenreList(prevList=>{
      return prevList.map(each=>{
        return each.id===id ? {...each, on:!each.on}: each;
      });
    })

    setForceRender(!forceRender) //TO render forcerully after this
  }

  //Saving the genreIDs for the searching functionality------------
  useEffect(()=>{
    const filteredGenres= updatedGenreList.filter(genre=> genre.on)
    setGenreIDs(filteredGenres.map(each=>each.id))
  },[updatedGenreList])

  

  //Searching by movie genres--------------------------
  useEffect(()=>{
    if(location==="/movies"){
      getMoviesByGenre(1);
      console.log(genreIDs)
    }else if(location==="/series"){
      getSeriesByGenre(1);
    }
    setGenreIDsProvider(genreIDs)

  },[genreIDs,location.pathname, updatedGenreList])


  

  return (
    <div className={`genre-wrapper ${props.call== "routes"? "routes" : ""}`}>
      <div className={`innerWidth genre-container ${props.call== "routes"? "routes" : ""}`}>

        {updatedGenreList.map(each=>{
          return <span className={`button ${each.on}`} key={each.id} onClick={()=> onGenreClick(each.id)}>{each.name}</span>
        })}
      </div>
    </div>
  );
};

export default Genre;