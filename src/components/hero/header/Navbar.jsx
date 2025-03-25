import SideBar from "@/components/ui/SideBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useTrendsContext } from "../../../contexts/TrendsContextProvider";
import SearchBar from "../../../separateComps/searchBar/SearchBar";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSaveState, setSavedMovies } = useTrendsContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //FOr scroll animation
  const [isScrolled, setIsScrolled]= useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Get current scroll position
      setIsScrolled(scrollTop > 300 ? true : scrollTop === 0 ? false : isScrolled);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]); // Depend on isScrolled to prevent unnecessary updates
  
  
  //-----------------------------------



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
    } else if (active == "Mylist") {
      if (!auth?.currentUser?.uid) {
        toast.error("You are not logged in!");
        navigate("/login");
      } else {
        navigate("/mylist");
      }
    } else {
      navigate(`/${active.toLowerCase()}`);
    }

    setIsOpen(false);
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
      toast("You have logged out.");
    } catch (e) {
      console.error("Error during logout:", e);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isOpen && (
        <SideBar
          onLogin={onLogin}
          onNavClick={onNavClick}
          onLogOut={onLogOut}
          currentUser={currentUser}
          auth={auth}
          isOpen={() => setIsOpen(false)}
        />
      )}

      <div className={`w-full flex flex-col nav-wrapper ${isScrolled ? 'fixed top-0 left-0 bg-black z-40 ' : ''} transition-all ease-in duration-300`}>
        <div className="innerWidth paddings flexStart nav-container flex">
          <div className="nav-logo">
          <span  className="font-bold lg:text-3xl md:text-2xl sm:text-1xl text-center flex"> <p>Nate</p> <p className="text-red-600">Flix</p></span>
          </div>
          <div className="flexBetween nav-right lg:gap-12 md:gap-6">
            {/* Navigation buttons */}
            <div className="nav-middle flex md:gap-8 lg:gap-12">
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
            <div className="auth-buttons flex lg:gap-2 md:gap-1">
              {!currentUser && !auth.currentUser && (
                <>
                  <div className="red-button" onClick={() => onLogin("Login")}>
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
              {currentUser && auth.currentUser && (
                <div className="gray-button bg-gray-500" onClick={onLogOut}>
                  Log out
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="innerWidth paddings flex items-center justify-between sideBar-container">
          <div className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
            <HiMenu size={30} />
          </div>
          <SearchBar />
        </div>
        <hr className={`${isScrolled ? "hidden" : ""}`}/>
      </div>
    </>
  );
};

export default Navbar;
