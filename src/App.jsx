import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Parent from "./components/Parent";
import MovieFetchProvider from "./contexts/movieFetchProvider";
import TrendsContextProvider from "./contexts/TrendsContextProvider";

function App() {
  return (
    <BrowserRouter>
      <MovieFetchProvider>
        <TrendsContextProvider>
        <Toaster />
          <Parent />
        </TrendsContextProvider>
      </MovieFetchProvider>
    </BrowserRouter>
  );
}

export default App;
