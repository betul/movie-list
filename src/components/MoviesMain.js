import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMovies,
  setFilteredMovies,
  setSelectedMovie,
  setCurrentPage,
  setSearchText,
  setTotalResults,
  setTotalPages,
} from "../redux/moviesSlice";
import { setFromDetailsPage } from "../redux/navigationSlice";
import SearchFilter from "./SearchFilter";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import { normalizeSearchQuery } from "../helper/utils";
import { debounce } from "lodash";

const MoviesMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const {
    pages,
    filteredMovies,
    totalResults,
    totalPages,
    currentPage,
    searchText,
    loading,
    error,
  } = useSelector((state) => state.movies);

  const { fromDetailsPage } = useSelector((state) => state.navigation);

  useEffect(() => {
    if (fromDetailsPage) {
      dispatch(setSearchText("Pokemon"));
      dispatch(fetchMovies({ query: "Pokemon", page: 1 }));
    }
  }, [dispatch, fromDetailsPage]);

  const applyFilters = useCallback(() => {
    const currentPageMovies = pages[currentPage] || [];
    const filtered = currentPageMovies.filter((movie) => {
      const matchesYear = yearFilter ? movie.Year.includes(yearFilter) : true;
      const matchesType = typeFilter
        ? movie.Type?.toLowerCase() === typeFilter.toLowerCase()
        : true;

      return matchesYear && matchesType;
    });
    dispatch(setFilteredMovies(filtered));
  }, [yearFilter, typeFilter, currentPage, pages, dispatch]);

  useEffect(() => {
    applyFilters();
  }, [yearFilter, typeFilter, currentPage, pages, applyFilters]);

  useEffect(() => {
    if (!searchText) {
      dispatch(setTotalResults(0));
      dispatch(setTotalPages(0));
    }
  }, [searchText, dispatch]);

  const debouncedFetchMovies = useCallback(
    debounce((normalizedValue) => {
      dispatch(fetchMovies({ query: normalizedValue, page: 1 }));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (value) => {
    const normalizedValue = normalizeSearchQuery(value);
    dispatch(setSearchText(value));
    dispatch(setCurrentPage(1));
    if (value.length >= 3) {
      dispatch(setFilteredMovies([]));
      debouncedFetchMovies(normalizedValue);
    } else {
      dispatch(setFilteredMovies([]));
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      dispatch(setCurrentPage(page));
      if (!pages[page]) {
        dispatch(
          fetchMovies({
            query: normalizeSearchQuery(searchText),
            page,
          })
        );
      } else {
        applyFilters();
      }
    }
  };

  return (
    <div>
      <SearchFilter
        searchText={searchText}
        onSearchChange={handleSearchChange}
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        totalResults={totalResults}
      />
      <div className="mb-4"></div>
      <MovieList
        movies={filteredMovies}
        loading={loading}
        error={error}
        columns={[
          {
            dataField: "order",
            text: "#",
            formatter: (cell, row, rowIndex) =>
              currentPage * 10 - 10 + rowIndex + 1,
            headerStyle: { width: "7%", textAlign: "center" },
            style: { textAlign: "center" },
          },
          {
            dataField: "Title",
            text: "Name",
            sort: true,
            formatter: (cell, row) => (
              <button
                className="details-link"
                onClick={() => {
                  dispatch(setFromDetailsPage(false));
                  dispatch(setSelectedMovie(row));
                  navigate(`/movies/${row.imdbID}`);
                }}
              >
                {cell}
              </button>
            ),
          },
          {
            dataField: "Year",
            text: "Release Date",
            sort: true,
          },
          { dataField: "imdbID", text: "IMDb ID" },
        ]}
        totalResults={totalResults}
        searchText={searchText}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MoviesMain;
