
import DiscoverButton from "@/components/ui/DiscoverButton";
import Hero from "../../components/hero/Hero";
import MovieBody from "../../components/movies/moviesBody/MovieBody";
import MoviesNav from "../../components/movies/moviesNav/MoviesNav";
import MoviesSort from "../../components/movies/moviesSort/MoviesSort";
import TrendsBody from "../../components/trends/trendsBody/TrendsBody";
import TrendsNav from "../../components/trends/trendsNav/TrendsNav";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendsNav />
      <TrendsBody />

      <MoviesSort />
      <MoviesNav />
      <MovieBody />
      <DiscoverButton/>
    </div>
  );
};

export default Home;
