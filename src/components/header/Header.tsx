import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SlidingMenu from "../slidingMenu/SlidingMenu";
import "./Header.css";

export const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathName, setpathName] = useState(location.pathname);
  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //userDetailsObj.entity

  useEffect(() => {
    setpathName(location.pathname);
  }, [location.pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToHome = () => {
    history.push("/");
  };

  return (
    <div className="site-header">
      <div className="logo" onClick={goToHome}>
        <img
          className="svg-image"
          src={require("../../assets/test.svg").default}
          alt="test"
          // width="295px"
          // height="295px"
        />
      </div>
      <div className="header" onClick={goToHome}>
        Qudraat index
      </div>
      {pathName == "/login" ? (
        <></>
      ) : (
        <div className="hamburger-menu-container left-menu">
          <div className="user-details">Hi, {userDetailsObj?.name}</div>
          <div
            className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
            onClick={handleMenuToggle}
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </div>
          {/* Sliding Menu */}
          <SlidingMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />
        </div>
      )}
    </div>
  );
};
