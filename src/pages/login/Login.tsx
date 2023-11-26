import React, { useEffect, useRef, useState } from "react";

import "./Login.css";
import { getHttp, postHttp } from "../../service/APIRequest";
import { useHistory } from "react-router-dom";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import { getUserApi, loginApi } from "../../service/Config";
import Store from "../../redux/Store";
import { createUserDetails } from "../../redux/features/userDetailsSlice";
import { InputField } from "../../components/InputField/InputField";
import { showErrorMesaage } from "../../redux/features/errorSlice";

export const Login = () => {
  const history = useHistory();
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // const [errorMessage, setErrorMessage] = useState("");

  const textBoxRef = useRef(null);

  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    if (!loginFormData.username || !loginFormData.password) {
      // Display an error message for empty fields
      // setErrorMessage("Username and password are required.");
      Store.dispatch(showErrorMesaage("Username and password are required."));
      return;
    }

    Store.dispatch(showErrorMesaage(""));
    try {
      const response = await postHttp(loginApi, loginFormData).then();
      console.log(response);

      if (response) {
        console.log(response);
        if (response?.status >= 200 && response?.status < 300) {
          getUserDetails(loginFormData.username);
        } else if (response?.status == 403) {
          console.log("-------");
          // setErrorMessage("jsdk");
        }
      } else {
        console.log("-----");
      }
    } catch (error) {
      console.error("Login failed", error);
      // setErrorMessage(error);
    }
  };

  const getUserDetails = async (user) => {
    const userResponse = await getHttp(getUserApi + user);
    if (userResponse) {
      sessionStorage.setItem("userDetails", JSON.stringify(userResponse.data));
      Store.dispatch(createUserDetails(JSON.stringify(userResponse.data)));
      sessionStorage.setItem("loginStatus", "true");
      history.push("/", userResponse.data);
    }
  };

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <InputField
          label="Username"
          value={loginFormData.username}
          onChange={handleChange}
          name="username"
          placeholder="Employee Number"
        />

        <InputField
          label="Password"
          value={loginFormData.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
          type="password"
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
        <ErrorComponent />
      </div>
    </div>
  );
};

export default Login;
