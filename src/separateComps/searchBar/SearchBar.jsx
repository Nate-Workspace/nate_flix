import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider"; // Assuming context is set
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { searchMovies } = useMovieFetchContext(); // Fetch function

  // Fetch search results when typing
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]); // Clear results when input is empty
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await searchMovies(searchValue); // API call
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounce = setTimeout(fetchResults, 300); // Debounce to prevent spam calls
    return () => clearTimeout(debounce);
  }, [searchValue, searchMovies]);

  // Navigate when a result is clicked
  const onMovieClick = (id, type) => {
    console.log("Navigating to:", `/${type}/${id}`);
    navigate(`/${type}/${id}`);
    setSearchValue("");
    setSearchResults([]);
  };

  // Handle Enter key selection
  const handleSubmit = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      const firstResult = searchResults[0];
      onMovieClick(firstResult.id, firstResult.type);
    }
  };

  console.log(searchResults)

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center bg-gray-800 text-white rounded-full px-4 py-2 w-full">
        <FaSearch size={15} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search a movie"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSubmit}
          className="w-full bg-transparent outline-none px-3 placeholder:text-gray-400 focus:placeholder-transparent"
        />
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <ul className="absolute left-0 w-full mt-3 bg-gray-900 text-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              className="px-4 py-3 cursor-pointer hover:bg-gray-700 transition border-b border-b-gray-600"
              onClick={() => onMovieClick(movie.id, movie?.title ? 'movie': 'tv')}
            >
              <div className="flex space-x-4">
                <div className="w-8 h-8"><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover"/></div>
                <div>{movie?.title ? movie.title: movie.name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
