import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../redux/Store";

import "./spinner.css";

export const LoadingSpinner = () => {
  // useEffect(() => {
  //   // Subscribe to state changes in the Redux store
  //   const unsubscribe = store.subscribe(() => {
  //     console.log(unsubscribe);
  //     // Get the updated state from the Redux store
  //     const state = store.getState();
  //     // Do something here with the updated state
  //   });

  //   // Unsubscribe from state changes when the component is unmounted
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  //   const isLoading = useSelector((state) => state.);
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  // console.log(isLoading);

  return (
    <div className="spinner-container">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};
