import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Login.css";
import { getHttp, postHttp } from "../../service/APIRequest";
import { useHistory } from "react-router-dom";
import UserLogin from "./UserLogin";
import DropDown from "../../components/dropDown/DropDown";
import { adminTypes, userTypes } from "../../service/Constants";
import { loginApi } from "../../service/Config";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin"); // Default value
  const [selectedEntity, setSelectedEntity] = useState(""); // Default value
  const [entityList, setEntityList] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const [adminType, setAdminType] = useState("main_admin");

  useEffect(() => {
    // getEntityList();
  }, []);

  console.log(userTypes);
  const handleLogin = async () => {
    if (!username || !password) {
      // Display an error message for empty fields
      setErrorMessage("Username and password are required.");
      return;
    }

    if (userType === "admin" && !adminType) {
      // Display an error message for admin type dropdown
      setErrorMessage("Please select an admin type.");
      return;
    }

    if (userType === "user" && !selectedEntity) {
      // Display an error message for entity dropdown
      setErrorMessage("Please select an entity.");
      return;
    }

    // Reset error message if there are no validation errors
    setErrorMessage("");
    try {
      const response = await postHttp(loginApi, {
        username,
        password,
        userType: userType == "admin" ? adminType : userType,
        entity: selectedEntity,
      });
      //console.log(response);
      //if (response.status == 200) {
      // Store token in session storage

      // Redirect to a protected page
      if (response) {
        sessionStorage.setItem("userDetails", JSON.stringify(response));
        sessionStorage.setItem("loginStatus", "true");
        history.push("/", response);
      }
      // }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(error);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    if (event.target.value == "user") {
      getEntityList();
    }
  };

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
    //console.log(selectedValue);
    //setSelectedEntity(selectedValue.label);
  };

  const getEntityList = async () => {
    const response = await getHttp("entity/getNameDetails"); //
    await setEntityList(response);
  };

  const handleAdminTypeChange = (event) => {
    setAdminType(event.target.value);
    //setSelectedEntity(selectedValue.label);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="display-flex">
          <div className="align-center">Username</div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="button"
          />
        </div>
        <div className="display-flex">
          <div className="align-center">Password</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="button"
          />
        </div>

        <div className="display-flex">
          <div className="align-center">User Type</div>

          {/* <DropDown
            mainList={userTypes}
            //name="Filter"
            onChangeDropDownItem={handleUserTypeChange}
            isMulti={false}
            classname="margin"
          /> */}
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {userType === "admin" && (
          <div className="display-flex">
            <div className="align-center">Admin Type</div>
            <select value={adminType} onChange={handleAdminTypeChange}>
              <option value="main_admin">Main Admin</option>
              <option value="desc_admin">Desc Admin</option>
            </select>

            {/* <DropDown
              mainList={adminTypes}
              //name="Filter"
              onChangeDropDownItem={handleEntityChange}
              isMulti={false}
            /> */}
          </div>
        )}

        {userType === "user" && (
          <div className="display-flex">
            <div className="align-center">Entity</div>
            <select value={selectedEntity} onChange={handleEntityChange}>
              {entityList?.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.label}
                </option>
              ))}
            </select>
            {/* <DropDown
              mainList={entityList}
              //name="Filter"
              onChangeDropDownItem={handleEntityChange}
              isMulti={false}
            /> */}
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
    // <UserLogin />
  );
}

export default Login;
