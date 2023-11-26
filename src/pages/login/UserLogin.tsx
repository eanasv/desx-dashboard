import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { postHttp } from "../../service/APIRequest";
import { useHistory } from "react-router-dom";

function UserLogin() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin"); // Default value
  const [selectedEntity, setSelectedEntity] = useState(""); // Default value

  const handleLogin = async () => {
    try {
      const response = await postHttp("auth/generateToken", {
        username,
        password,
        userType,
        entity: selectedEntity,
      });

      // Store token in session storage
      sessionStorage.setItem("token", response.data.token);

      // Redirect to a protected page
      history.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
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
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {userType === "admin" && (
          <div className="display-flex">
            <div className="align-center">Admin Type</div>
            <select>
              <option value="main-admin">Main Admin</option>
              <option value="desc-admin">Desc Admin</option>
            </select>
          </div>
        )}
        {userType === "user" && (
          <div className="display-flex">
            <div className="align-center">Entity</div>
            <select value={selectedEntity} onChange={handleEntityChange}>
              <option value="entity1">Entity 1</option>
              <option value="entity2">Entity 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        )}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default UserLogin;
