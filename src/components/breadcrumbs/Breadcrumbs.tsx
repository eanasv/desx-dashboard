import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./Breadcrumbs.css";

const Breadcrumbs = ({ paths }) => {
  const location = useLocation();
  const history = useHistory();
  const [breadcrumbNames, setBreadcrumbNames] = useState([]);

  useEffect(() => {
    const names = getBreadcrumbNames(location.pathname);
    setBreadcrumbNames(names);
  }, [location]);

  const getBreadcrumbNames = (pathname) => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    return segments;

    // Return the breadcrumb names based on the segments
    // if (segments.length === 0) {
    //   return [""];
    // } else {
    //   // Get the last segment as the current breadcrumb name
    //   const lastSegment = segments[segments.length - 1];
    //   return [
    //     <Link to="/">
    //       <img
    //         className="svg-image1"
    //         src={require("../../assets/home.svg").default}
    //         alt="home"
    //         width="19px"
    //         height="19px"
    //       />
    //     </Link>,
    //     segments,
    //   ];
    // }
  };

  // const handleListItemClick = (itemName) => {
  //   // Update the last breadcrumb name and navigate to the corresponding page
  //   const newPathname = `${location.pathname}/${itemName}`;
  //   const names = getBreadcrumbNames(newPathname);
  //   setBreadcrumbNames(names);
  //   history.push(newPathname);

  // };

  const customNames = {
    entityDetails: "entities index",
    categoryList: "workforce index",
    // Add more custom names as needed
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/([A-Z])/g, (match) => match.toLowerCase()) // Convert capital letters to lowercase
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
  };

  return (
    <nav>
      <div className="breadcrumbs-container">
        <Link to="/">
          <img
            className="svg-image1"
            src={require("../../assets/home.svg").default}
            alt="home"
            width="19px"
            height="19px"
          />
        </Link>
        {breadcrumbNames.map((path, index) => (
          <React.Fragment key={index}>
            {breadcrumbNames.length > 1 ? <span> / </span> : ""}
            {breadcrumbNames.length == 1 ? (
              <></>
            ) : index < breadcrumbNames.length - 1 ? (
              <Link
                className="bread-font"
                to={`/${breadcrumbNames.slice(0, index + 1).join("/")}`}
              >
                {capitalizeFirstLetter(path)}
              </Link>
            ) : (
              <span className="bread-font">{capitalizeFirstLetter(path)}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
    // <nav>
    //   <div className="breadcrumbs-container">
    //     <Link to="/">
    //       <img
    //         className="svg-image1"
    //         src={require("../../assets/home.svg").default}
    //         alt="home"
    //         width="19px"
    //         height="19px"
    //       />
    //     </Link>
    //     {paths.map((path, index) => (
    //       <React.Fragment key={index}>
    //         <span> / </span>
    //         {index < paths.length - 1 ? (
    //           <Link to={path.url}>{path.label}</Link>
    //         ) : (
    //           <span>{path.label}</span>
    //         )}
    //       </React.Fragment>
    //     ))}
    //   </div>
    // </nav>

    // <nav>
    //   <div className="breadcrumbs-container">
    //     {breadcrumbNames.map((name, index) => (
    //       <div key={index}>
    //         {index !== breadcrumbNames.length - 1 ? (
    //           <Link to={`${breadcrumbNames.slice(0, index + 1).join("/")}`}>
    //             {name}
    //           </Link>
    //         ) : (
    //           <span>{name.length != 0 ? "/" + name : ""}</span>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </nav>
  );
};

export default Breadcrumbs;
