import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchMovieById = createAsyncThunk(
  "movieDetails/fetchMovieById",
  async (id, { getState, rejectWithValue }) => {
    const state = getState().movieDetails;

    if (state.movieCache[id]) {
      return { cached: true, data: state.movieCache[id] };
    }

    try {
      const response = await api.get("/", {
        params: { i: id, plot: "full" },
      });
      return { cached: false, data: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch movie details.");
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movieCache: {},
    selectedMovie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearMovieCache: (state) => {
      state.movieCache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const { cached, data } = action.payload;

        state.loading = false;

        if (!cached) {
          state.movieCache[data.imdbID] = data;
        }

        state.selectedMovie = data;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMovie, clearMovieCache } =
  movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
