import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesMain from "./components/MoviesMain";
import MovieDetail from "./components/Detail/MovieDetail";
import "./assets/scss/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="d-flex align-items-center justify-content-center gap-3">
          <i className="fas fa-film"></i> Movie List
        </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<MoviesMain />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
