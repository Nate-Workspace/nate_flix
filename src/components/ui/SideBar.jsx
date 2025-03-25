import { useNavigate, useLocation } from "react-router-dom";
import { FaTv, FaFilm, FaHome, FaList,FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SideBar = ({ onLogin, onNavClick, onLogOut, currentUser, auth, isOpen }) => {
  const location = useLocation();

  const middleStyle =
    "md:px-4 sm:px-2 md:py-4 sm:py-3 hover:cursor-pointer hover:bg-gray-500 hover:text-black flex items-center sm:gap-1 md:gap-2 transition-all ease-in duration-300";
    
  return (
    <div className={`relative w-full z-50 side-body inset-0  transition-all ease-in duration-200`}>
      <div className="fixed md:w-1/3 sm:w-1/2  bg-gray-600 h-screen z-50">
        <div className="flex flex-col pt-6 h-full">
          <div className="md:px-4 sm:px-2 md:mb-6 sm:mb-4" onClick={isOpen}>
            <IoClose size={30} className="text-white cursor-pointer"/>
          </div>
          <div className="sm:mb-2 md:mb-4 md:px-4 sm:px-2">
            <span className="font-bold md:text-3xl sm:text-2xl text-center flex">
              {" "}
              <p>Nate</p> <p className="text-red-600">Flix</p>
            </span>
          </div>
          <div className="flex flex-col lg:gap-12 md:gap-6 flex-1 pb-6 justify-between">
            {/* Navigation buttons */}
            <div className="flex  flex-col">
              <span
                onClick={() => onNavClick("Home")}
                className={`${
                  location.pathname === "/" ? "active" : ""
                } ${middleStyle}`}
              >
                <FaHome size={16} />
                Home
              </span>
              <span
                onClick={() => onNavClick("Movies")}
                className={`${
                  location.pathname === "/movies" ? "active" : ""
                } ${middleStyle}`}
              >
                <FaTv size={16} />
                Movies
              </span>
              <span
                onClick={() => onNavClick("Series")}
                className={`${
                  location.pathname === "/series" ? "active" : ""
                } ${middleStyle}`}
              >
                <FaFilm size={16} />
                Series
              </span>
              <span
                onClick={() => onNavClick("Mylist")}
                className={`${
                  location.pathname === "/mylist" ? "active" : ""
                } ${middleStyle}`}
              >
                <FaList size={16} />
                My list
              </span>
            </div>

            <div className="auth-buttons flex flex-col md:gap-2">
              {!currentUser && !auth.currentUser && (
                <>
                  <div className={`${middleStyle}`} onClick={() => onLogin("Login")}>
                    Login
                  </div>
                  <div
                    className={`${middleStyle}`}
                    onClick={() => onLogin("Sign Up")}
                  >
                    Sign up
                  </div>
                </>
              )}
              {currentUser && auth.currentUser && (
                <div className={`${middleStyle}`} onClick={onLogOut}>
                  Log out
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
