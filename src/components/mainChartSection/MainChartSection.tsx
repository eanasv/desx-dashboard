import React, { useEffect, useState } from "react";
import CategoryDetails from "../../pages/categoryDetails/CategoryDetails";
import CategoryList from "../../pages/categoryList/CategoryList";
import "./MainChartSection.css";

export const MainChartSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clickedItem, setclickedItem] = useState<any>();

  const goToCategoryDetailsPage = (id, name) => {
    //console.log("clicked", id);
    setSelectedCategory(true);
    setclickedItem({ name: name, id: id });
  };

  const backButtonClicked = () => {
    setSelectedCategory(false);
  };

  if (selectedCategory) {
    return (
      // <div>
      <CategoryDetails
      // details={clickedItem}
      // backButtonClicked={backButtonClicked}
      />
      // </div>
    );
  } else {
    return <CategoryList categoryClick={goToCategoryDetailsPage} />;
  }
};
