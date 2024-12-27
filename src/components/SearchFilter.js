import React from "react";

const SearchFilter = ({
  searchText,
  onSearchChange,
  yearFilter,
  onYearFilterChange,
  typeFilter,
  onTypeFilterChange,
  totalResults,
}) => (
  <>
    <div className="row mb-3">
      <div className="col-12 col-md-8 mb-2 mb-md-0">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search by movie name"
            className="form-control"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12 col-md-4 text-md-end text-center">
        <span>Total Results: {totalResults}</span>
      </div>
    </div>

    <div className="row">
      <div className="col-12 col-md-6 col-lg-4 mb-2 mb-md-0">
        <input
          type="text"
          placeholder="Filter by year (e.g., 1999)"
          className="form-control"
          value={yearFilter}
          onChange={(e) => onYearFilterChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <select
          className="form-select"
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Episodes</option>
        </select>
      </div>
    </div>
  </>
);

export default SearchFilter;
