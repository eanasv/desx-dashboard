import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice";
import errorSliceReducer from "./features/errorSlice";
import userDetailsReducer from "./features/userDetailsSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    errorMessage: errorSliceReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
