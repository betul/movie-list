import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMovieById } from "../../redux/movieDetailsSlice";
import { setFromDetailsPage } from "../../redux/navigationSlice";
import MoviePoster from "./MoviePoster";
import MovieInfoList from "./MovieInfoList";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movieDetails
  );

  const { fromDetailsPage } = useSelector((state) => state.navigation);

  useEffect(() => {
    if (!selectedMovie || selectedMovie.imdbID !== id) {
      dispatch(fetchMovieById(id));
    }

    if (fromDetailsPage) {
      dispatch(setFromDetailsPage(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, selectedMovie?.imdbID, fromDetailsPage]);

  useEffect(() => {
    return () => {
      dispatch(setFromDetailsPage(false));
    };
  }, [dispatch]);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        No details available for this movie.
      </div>
    );
  }

  return (
    <div className="container my-4 text-light">
      <Link to="/" className="btn btn-primary mb-3">
        Back to Movie List
      </Link>
      <div className="row g-4">
        <div className="col-md-4">
          <MoviePoster movie={selectedMovie} />
        </div>
        <div className="col-md-8">
          <MovieInfoList movie={selectedMovie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
