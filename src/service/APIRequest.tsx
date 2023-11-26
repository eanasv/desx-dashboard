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
  const token = getToken();

  store.dispatch(showLoader());
  //var responseGet;
  const getResponse = axios
    .get(configVariable.baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      params: params ? params : null,
    })

    .then((response) => {
      console.log(response);
      store.dispatch(hideLoader());

      return response.data;
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      console.log(error);
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

// export const postHttp = (url, formData, isMultipart?) => {
//   //event.preventDefault();
//   store.dispatch(showLoader());
//   const headers: any = {
//     "Content-Type": "application/json",
//     // Add other default headers here
//   };
//   console.log(url + "---0000----", formData);
//   if (url.indexOf("login") == -1) {
//     // If the URL does not contain "login", add Authorization header
//     console.log("----");
//     const token = getToken();
//     headers.Authorization = `Bearer ${token}`;
//   }
//   if (isMultipart) {
//     headers["Content-Type"] = "multipart/form-data";
//   }

//   const postResponse = axios
//     .post(configVariable.baseUrl + url, formData, { headers })
//     .then((response) => {
//       store.dispatch(hideLoader());

//       console.log("Data submitted successfully!", response);
//       if (response.status >= 200 && response.status < 299) {
//         if (url.indexOf("login") !== -1) {
//           localStorage.setItem("jwtToken", response.data);
//           setToken(response.data.data.access_token);
//           return response.data;
//         } else {
//           console.log("not login api!.");
//           return response.data;
//         }

//         Store.dispatch(hideErrorMesaage());
//       } else {
//         Store.dispatch(showErrorMesaage("Something went wrong!!"));
//         return "Something went wrong!!";
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       store.dispatch(hideLoader());
//       // Store.dispatch(showErrorMesaage(error.message));
//       Store.dispatch(showErrorMesaage(error?.response?.data));
//       console.error("Error submitting data:", error?.response?.data);
//       throw new Error(
//         "Forbidden: You don't have permission to access this resource."
//       );

//       return error?.response?.data;
//     });
//   return postResponse;
// };

export const postHttp = async (url, formData, isMultipart?) => {
  try {
    store.dispatch(showLoader());
    const headers: any = {
      "Content-Type": "application/json",
      // Add other default headers here
    };
    if (isMultipart) {
      headers["Content-Type"] = "multipart/form-data";
    }

    if (url.indexOf("login") === -1) {
      const token = getToken();
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(configVariable.baseUrl + url, formData, {
      headers,
    });

    store.dispatch(hideLoader());
    console.log(response + "**********");
    if (response.status >= 200 && response.status < 300) {
      if (url.indexOf("login") !== -1) {
        localStorage.setItem("jwtToken", response.data);
        setToken(response.data.data.access_token);
        return response.data;
      } else {
        return response.data;
      }
    } else {
      // Dispatch an error message action if the status code is not within the success range
      Store.dispatch(showErrorMesaage("Something went wrong!!"));
      return "Something went wrong!!";
    }
  } catch (error) {
    Store.dispatch(showErrorMesaage(error?.response?.data.message + "!!"));
    store.dispatch(hideLoader());

    if (error.response && error.response.status === 403) {
      Store.dispatch(showErrorMesaage("Incorrect username or password."));
      throw new Error(
        "Forbidden: You don't have permission to access this resource."
      );
    } else {
      throw new Error("An error occurred during the request.");
    }
  }
};

export const putHttp = (url, formData) => {
  //event.preventDefault();
  store.dispatch(showLoader());
  const token = getToken();
  const putResponse = axios
    .put(configVariable.baseUrl + url, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
  const token = getToken();
  const deleteResponse = axios
    .delete(configVariable.baseUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

const removeToken = () => {
  localStorage.removeItem("jwtToken");
};
