import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import moviesReducer from "./moviesSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import navigationReducer from "./navigationSlice";

// Root Reducer
const rootReducer = combineReducers({
  movies: moviesReducer,
  movieDetails: movieDetailsReducer,
  navigation: navigationReducer,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
