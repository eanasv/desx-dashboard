import React from "react";
import { useHistory } from "react-router-dom";
import "./SlidingMenu.css";

interface SlidingMenuInterface {
  isOpen?: any;
  onClose?: any;
}

const SlidingMenu: React.FC<SlidingMenuInterface> = ({ isOpen, onClose }) => {
  const history = useHistory();

  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //userDetailsObj.entity

  const goToPages = (pageName) => {
    //props.onEntityClick(entityName, score, logo);
    onClose();
    history.push(pageName);
  };

  const logout = () => {
    sessionStorage.clear();
    onClose();
    history.push("/login");
  };

  const fileUpload = () => {
    onClose();
    history.push("/upload");
  };

  const createProfile = () => {
    onClose();
    history.push("/addProfile");
  };

  const addUser = () => {
    onClose();
    history.push("/addUser");
  };

  return (
    <div className={`sliding-menu ${isOpen ? "open" : ""}`}>
      {/* Content of the menu */}
      <div className="close-button" onClick={onClose}>
        X
      </div>
      <div className="side-menu-container">
        <div className="each-menu" onClick={() => goToPages("/Home")}>
          Entities Index
        </div>
        <div className="each-menu" onClick={() => goToPages("/workforceIndex")}>
          Workforce index
        </div>
        <div
          className="each-menu"
          onClick={() => goToPages("/digital skills historical scoring")}
        >
          Digital skills Historical Scoring
        </div>
      </div>
      {userDetailsObj?.role == "main_admin" && (
        <div className="logout-container" onClick={addUser}>
          Add user
        </div>
      )}

      {(userDetailsObj?.role == "main_admin" ||
        userDetailsObj?.role == "user") && (
        <div className="logout-container" onClick={fileUpload}>
          upload data
        </div>
      )}
      {(userDetailsObj?.role == "main_admin" ||
        userDetailsObj?.role == "user") && (
        <div className="logout-container" onClick={createProfile}>
          add employee profile
        </div>
      )}
      <div className="logout-container" onClick={logout}>
        logout
      </div>
    </div>
  );
};

export default SlidingMenu;
