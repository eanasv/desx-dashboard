import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {},
  reducers: {
    createUserDetails: (state, action) => {
      state = action.payload;
    },
    removeUserDetails: (state) => {
      state = {};
    },
  },
});
// Action creators are generated for each case reducer function
export const { createUserDetails, removeUserDetails } =
  userDetailsSlice.actions;
export default userDetailsSlice.reducer;
