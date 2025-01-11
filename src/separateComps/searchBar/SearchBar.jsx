import React, { useState } from "react";
import "./searchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  //Handling the submit of the search-------------

  const handleSubmit=(e)=>{
    if(e.key=="Enter"){
      console.log("You entered: " + searchValue) //Enter logic here
    }
  }

  return (
    <div className="flexStart search-bar">
      <FaSearch size={18} />
      <input
        type="text"
        placeholder="Search a movie"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </div>
  );
};

export default SearchBar;
