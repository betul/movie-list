import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromDetailsPage: true,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setFromDetailsPage: (state, action) => {
      state.fromDetailsPage = action.payload;
    },
  },
});

export const { setFromDetailsPage } = navigationSlice.actions;

export default navigationSlice.reducer;
