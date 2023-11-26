import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      //console.log("loading started");
      state.isLoading = true;
    },
    hideLoader: (state) => {
      //console.log("loading stopped");

      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
