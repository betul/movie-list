import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import navigationReducer from "./navigationSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    navigation: navigationReducer,
  },
});

export default store;
