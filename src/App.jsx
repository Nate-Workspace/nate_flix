import "./App.css";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import MyList from "./pages/myList/MyList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import MovieFetchProvider from "./contexts/movieFetchProvider";
import TrendsContextProvider from "./contexts/TrendsContextProvider";
import Details from "./pages/details/Details";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PublicRoute from "./components/auth/PublicRoute";
import NotFound from "./components/auth/NotFound";

function App() {
  return (
    <BrowserRouter>
    <MovieFetchProvider>
      <TrendsContextProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />}/>
          <Route path="/series" element={<Series />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/movie/:id" element={<Details/>} />
          <Route path="/tv/:id" element={<Details/>} />

          {/* Protected routing */}
          <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />

          {/* Page not found routing */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </div>
      </TrendsContextProvider>
      </MovieFetchProvider>
    </BrowserRouter>
  );
}

export default App;
