import React from "react";
import DefaultPoster from "../../assets/300.png";

const MoviePoster = ({ movie }) => {
  const { Title, Year, Poster } = movie;

  return (
    <div className="card shadow-sm">
      <img
        src={Poster !== "N/A" ? Poster : DefaultPoster}
        alt={Title}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title text-center">{Title}</h5>
        <p className="card-text text-center">({Year})</p>
      </div>
    </div>
  );
};

export default MoviePoster;
