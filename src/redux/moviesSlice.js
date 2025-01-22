import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/", {
        params: { s: query, page },
      });
      return { query, page, data: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch movies.");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    pages: {},
    filteredMovies: [],
    selectedMovie: null,
    totalResults: 0,
    totalPages: 0,
    currentPage: 1,
    searchText: "Pokemon",
    loading: false,
    error: null,
  },
  reducers: {
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchText: (state, action) => {
      if (state.searchText !== action.payload) {
        state.pages = {};
        state.currentPage = 1;
        state.totalResults = 0;
        state.totalPages = 0;
      }
      state.searchText = action.payload;
    },

    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { page, data } = action.payload;
        state.pages[page] = data.Search || [];
        state.totalResults = parseInt(data.totalResults, 10) || 0;
        state.totalPages = Math.ceil(state.totalResults / 10);
        state.filteredMovies = state.pages[state.currentPage] || [];
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilteredMovies,
  setSelectedMovie,
  clearSelectedMovie,
  setCurrentPage,
  setSearchText,
  setTotalResults,
  setTotalPages,
} = moviesSlice.actions;

export default moviesSlice.reducer;
