import React, { useState } from "react";
import DropDown from "../../components/dropDown/DropDown";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import Popup from "../../components/popup/Popup";
import { UserList } from "../../components/userList/UserList";
import { showErrorMesaage } from "../../redux/features/errorSlice";
import Store from "../../redux/Store";
import {
  deleteHttp,
  getHttp,
  postHttp,
  putHttp,
} from "../../service/APIRequest";
import { userapi } from "../../service/Config";
import { userTypes } from "../../service/Constants";
import "./UserCreation.css";

export const UserCreation = () => {
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    role: "main_admin",
    entity: "",
    password: "",
    confirmPassword: "",
  });

  const [entityList, setEntityList] = useState<any>();
  const [flag, setflag] = useState(true);
  const [userType, setUserType] = useState("admin");
  const [createUser, setcreateUser] = useState(true);
  const [openPopup, setopenPopup] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    console.log(userData);
    e.preventDefault();
    var endpoint;
    if (createUser) {
      endpoint = userapi + "addUser";
      postHttp(endpoint, userData)
        .then((response) => {
          console.log(response);

          if (response.status >= 200 && response.status < 300) {
            setUserData({
              id: 0,
              name: "",
              username: "",
              email: "",
              role: "",
              entity: "",
              password: "",
              confirmPassword: "",
            });
            Store.dispatch(showErrorMesaage("User created successfully"));
            setflag(!flag);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setopenPopup(false);
      endpoint = userapi + userData.id;
      putHttp(endpoint, userData)
        .then((response) => {
          console.log(response);

          if (response.status >= 200 && response.status < 300) {
            setUserData({
              id: 0,
              name: "",
              username: "",
              email: "",
              role: "",
              entity: "",
              password: "",
              confirmPassword: "",
            });
            Store.dispatch(showErrorMesaage("User Updated successfully"));
            setflag(!flag);
            setcreateUser(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUsernameChange = (event) => {
    const inputValue = event.target.value;
    const formattedName = inputValue.toLowerCase().replace(/\s+/g, ".");
    console.log(formattedName);
    setUserData({
      ...userData,
      //name: event.target.value,
      username: formattedName,
    });
    //setName(inputValue);

    //setUsername(formattedName);
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    setUserData({ ...userData, role: value });
    if (value == "user") {
      getEntityList();
    }
  };

  const getEntityList = async () => {
    const response = await getHttp("entity/getNameDetails"); //
    await setEntityList(response);
  };

  const setUserDetailsForEdit = (details) => {
    console.log(details);
    setcreateUser(false);
    handleUserTypeChange(details.role);
    setUserData(details);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling behavior
    });
  };

  const clickedUpdateUser = () => {
    setopenPopup(!openPopup);
  };

  const deleteSelectedUser = async (id) => {
    console.log(id);
    const response = await deleteHttp(userapi + id); //
    console.log(response);
    setflag(!flag);
  };

  const checkUsernameExist = (event) => {
    console.log("4545", event.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setUserData({ ...userData, confirmPassword: confirmPasswordValue });

    // Check if passwords match while typing
    setPasswordsMatch(userData.password === confirmPasswordValue);
  };

  return (
    <div className="create-user-container">
      <div className="user-creation-form login-form1">
        {createUser ? <h2>User Creation</h2> : <h2>Edit User</h2>}
        <form onSubmit={handleSubmit} className="create-container">
          <div className="form-group">
            <div className="display-flex">
              <div className="align-center">Name</div>
              <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={
                  (e) => setUserData({ ...userData, name: e.target.value })
                  //  handleNameChange(e)
                }
                className="button"
                required
              />
            </div>
            <div className="display-flex">
              <div className="align-center">Username</div>
              <input
                type="text"
                placeholder="USERNAME"
                value={userData.username}
                onChange={(e) =>
                  //setUserData({ ...userData, name: e.target.value })
                  handleUsernameChange(e)
                }
                className="button lowercase"
                onBlur={(e) => checkUsernameExist(e)}
                required
              />
            </div>
            <div className="display-flex">
              <div className="align-center">Email</div>
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="button"
                required
              />
            </div>
            <div className="display-flex">
              <div className="align-center">Role</div>

              <select
                className="new-user button"
                value={userType}
                required
                onChange={(event) => handleUserTypeChange(event.target.value)}
              >
                <option value=""> Select role</option>
                {userTypes.map((item, index) => (
                  <option key={index} value={item.label}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {userType === "user" && (
              <div className="display-flex">
                <div className="align-center">Entity</div>
                <select
                  required
                  className="new-user button"
                  value={userData.entity}
                  onChange={(e) =>
                    setUserData({ ...userData, entity: e.target.value })
                  }
                >
                  <option value=""> Select Organization</option>
                  {entityList?.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {createUser && (
              <div>
                <div className="display-flex">
                  <div className="align-center">password</div>
                  <input
                    type="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    className="button"
                    required
                  />
                </div>
                <div className="display-flex">
                  <div className="align-center">Confirm Password</div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={userData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="button"
                    required
                  />
                </div>
              </div>
            )}
          </div>
          {!passwordsMatch && (
            <p className="error-message">Passwords do not match</p>
          )}

          {createUser ? (
            <button type="submit" disabled={!passwordsMatch}>
              Create User
            </button>
          ) : (
            <button onClick={() => clickedUpdateUser()}>Update User</button>
          )}

          <ErrorComponent />
        </form>
      </div>
      <UserList
        refresh={flag}
        setUserDetailsForEdit={setUserDetailsForEdit}
        deleteUser={deleteSelectedUser}
      />
    </div>
  );
};
