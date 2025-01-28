import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
import SearchBar from "../../../separateComps/searchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useTrendsContext } from "../../../contexts/TrendsContextProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {setSaveState, setSavedMovies}= useTrendsContext()
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onNavClick = (active) => {
    if (active === "Home") {
      navigate("/");
    } else {
      navigate(`/${active.toLowerCase()}`);
    }
  };

  const onLogin = (active) => {
    if (active === "Login") {
      navigate(`/login`);
    } else if (active === "Sign Up") {
      navigate(`/signup`);
    }
  };

  const onLogOut = async () => {
    try {
      await signOut(auth);
      setSaveState(false); 
      setSavedMovies([]);
      window.alert("You have successfully logged out.");
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <div className="w-full flex flex-col nav-wrapper">
      <div className="innerWidth paddings flexStart nav-container">
        <div className="nav-logo">
          <img
            src="/NATEflix.png"
            alt="logo"
            onClick={() => onNavClick("Home")}
          />
        </div>
        <div className="flexBetween nav-right">
          {/* Navigation buttons */}
          <div className="nav-middle">
            <span
              onClick={() => onNavClick("Home")}
              className={`${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </span>
            <span
              onClick={() => onNavClick("Movies")}
              className={`${location.pathname === "/movies" ? "active" : ""}`}
            >
              Movies
            </span>
            <span
              onClick={() => onNavClick("Series")}
              className={`${location.pathname === "/series" ? "active" : ""}`}
            >
              Series
            </span>
            <span
              onClick={() => onNavClick("Mylist")}
              className={`${location.pathname === "/mylist" ? "active" : ""}`}
            >
              My list
            </span>
          </div>

          <SearchBar />
          <div className="auth-buttons flex gap-2">
            {!currentUser && !auth.currentUser && (
              <>
                <div
                  className="red-button"
                  onClick={() => onLogin("Login")}
                >
                  Login
                </div>
                <div
                  className="gray-button bg-gray-500"
                  onClick={() => onLogin("Sign Up")}
                >
                  Sign up
                </div>
              </>
            )}
            {currentUser && auth.currentUser &&(
              <div
                className="gray-button bg-gray-500"
                onClick={onLogOut}
              >
                Log out
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
