import axios, { AxiosResponse } from "axios";
import * as configVariable from "./Config";
import { useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/features/loaderSlice";
import store from "../redux/Store";
import { createAction } from "@reduxjs/toolkit";
import {
  hideErrorMesaage,
  showErrorMesaage,
} from "../redux/features/errorSlice";
import Store from "../redux/Store";
// import { showErrorMesaage } from "../redux/actions/Actions";

export const getHttp = (url, params?) => {
  // const dispatch = useDispatch();

  store.dispatch(showLoader());
  //var responseGet;
  const getResponse = axios
    .get(configVariable.baseUrl + url, {
      params: params ? params : null,
    })

    .then((response) => {
      console.log(response.status);
      store.dispatch(hideLoader());

      return response.data;
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      //return error;
    });

  return getResponse;

  //   try {
  //     const response = await axios.get(configVariable.baseUrl + url);
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
};

export const postHttp = (url, formData) => {
  //event.preventDefault();
  store.dispatch(showLoader());
  console.log(formData, "----000------");
  const postResponse = axios
    .post(configVariable.baseUrl + url, formData)
    .then((response) => {
      store.dispatch(hideLoader());

      console.log("Data submitted successfully!", response.data);
      console.log(response);
      if (response.status == 200) {
        Store.dispatch(hideErrorMesaage());
        return response.data;
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      Store.dispatch(showErrorMesaage(error.response.data));
      console.error("Error submitting data:", error.response.data.message);
      //return error;
    });
  return postResponse;
};

export const putHttp = (url, formData) => {
  //event.preventDefault();
  store.dispatch(showLoader());

  const putResponse = axios
    .put(configVariable.baseUrl + url, formData)
    .then((response: AxiosResponse) => {
      store.dispatch(hideLoader());

      console.log("Data Updated successfully!", response.data);
      console.log(response);
      if (response.status >= 200 && response.status < 299) {
        Store.dispatch(hideErrorMesaage());
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      store.dispatch(hideLoader());
      // Store.dispatch(showErrorMesaage(error.message));
      Store.dispatch(showErrorMesaage(error?.response?.data));
      console.error("Error submitting data:", error?.response?.data);
      return error?.response?.data;
    });
  return putResponse;
};

export const deleteHttp = (url) => {
  //event.preventDefault();
  store.dispatch(showLoader());

  const deleteResponse = axios
    .delete(configVariable.baseUrl + url)
    .then((response: AxiosResponse) => {
      store.dispatch(hideLoader());

      console.log("User deleted successfully:", response.data);
      console.log(response);
      if (response.status >= 200 && response.status < 299) {
        Store.dispatch(hideErrorMesaage());
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      store.dispatch(hideLoader());
      // Store.dispatch(showErrorMesaage(error.message));
      Store.dispatch(showErrorMesaage(error?.response?.data));
      console.error("Error deleting data:", error?.response?.data);
      return error?.response?.data;
    });
  return deleteResponse;
};
