import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const MovieList = ({
  movies,
  loading,
  error,
  columns,
  totalResults,
  searchText,
}) => {
  const safeSearchText = searchText || "";
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-warning text-center">{error}</div>;
  }

  if (!safeSearchText.trim()) {
    return (
      <div className="alert alert-info text-center">
        Please search for a movie to see results.
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="alert alert-warning text-center">
        No results found for "{safeSearchText}". Please try a different search
        term.
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="alert alert-warning text-center">
        No results found. Please refine your search.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <BootstrapTable
        bootstrap4
        keyField="imdbID"
        data={movies}
        columns={columns}
        bordered={false}
        hover
        striped
      />
    </div>
  );
};

export default MovieList;
