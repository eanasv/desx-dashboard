import { createSlice } from "@reduxjs/toolkit";
import { SHOW_ERROR, HIDE_ERROR } from "../actions/ActionTypes";

export const errorSlice = createSlice({
  name: "errorMesaage",
  initialState: {
    errorMessage: "" || [],
  },
  reducers: {
    showErrorMesaage: (state, action) => {
      console.log(action, "+++++++ loading started -------", state);
      state.errorMessage = action.payload;
    },
    hideErrorMesaage: (state) => {
      //console.log("loading stopped");

      state.errorMessage = "" || [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { showErrorMesaage, hideErrorMesaage } = errorSlice.actions;

export default errorSlice.reducer;
