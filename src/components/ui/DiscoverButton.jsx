import { useTrendsContext } from "@/contexts/TrendsContextProvider";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DiscoverButton = () => {
  const navigate = useNavigate();
  const { moviesNavValue } = useTrendsContext();
  const [route, setRoute] = useState("movies");

  useEffect(() => {
    setRoute(moviesNavValue === "Movies" ? "movies" : "series");
  }, [moviesNavValue]);

  return (
    <div className="mb-14">
      <div className="innerWidth paddings">
        <button
          className="px-5 py-2 bg-blue-500 rounded-sm lg:text-base sm:text-sm font-semibold hover:bg-blue-900 transition-all"
          onClick={() => navigate(`/${route}`)}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default DiscoverButton;
