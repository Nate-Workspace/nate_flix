import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MovieFetchProvider from "./contexts/MovieFetchProvider";
import TrendsContextProvider from "./contexts/TrendsContextProvider";
import Parent from "./components/Parent";

function App() {
  return (
    <BrowserRouter>
      <MovieFetchProvider>
        <TrendsContextProvider>
        <Toaster />
          <Parent/>
        </TrendsContextProvider>
      </MovieFetchProvider>
    </BrowserRouter>
  );
}

export default App;
