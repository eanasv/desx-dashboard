import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
//import Table1 from "../../components/compass/Table1";
import Doughnut from "../../components/Graph/donutChart/Doughnut";
import "./CategoryList.css";

import { getHttp } from "../../service/APIRequest";
import { SubHeader } from "../../components/subHeader/SubHeader";
import { Popover } from "../../components/popup/Popover";

const CategoryList = ({ categoryClick }) => {
  var overallEmployee = 0;
  const [subTotalEmpl, setsubTotalEmpl] = useState(0);
  const [grandTotalEmployee, setgrandTotalEmployee] = useState(0);
  const [mainCategoryListByCount, setMainCategoryListByCount] = useState<any>(
    []
  );
  const [subcategoryLevelList, setsubcategoryLevelList] = useState([]);

  const history = useHistory();
  const [tablePopupData, setTablePopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //userDetailsObj.entity

  useEffect(() => {
    fetchCatagoryList(userDetailsObj.entity);
  }, []);

  // useEffect(() => {
  //   setsubTotalEmpl(overallEmployee);
  // }, [overallEmployee]);

  var levelArray = new Array(9).fill(0);

  // const fetchCatagoryList1 = async (param?) => {
  //   const response = await getHttp("count-by-category");
  //   setMainCategoryListByCount(response);
  //   fetchCatagoryLevelList(1);
  // };

  const fetchCatagoryList = (param?) => {
    let endpoint = "count-by-category";

    if (param) {
      endpoint += `?entityName=${param}`;
    }

    getHttp(endpoint)
      .then((response) => {
        //console.log(response);

        setMainCategoryListByCount(response);
        fetchCatagoryLevelList(param);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });

    //const response = await getHttp(endpoint);
  };

  const goToCategoryDetailsPage = (id, item?) => {
    //categoryClick(id, item);
    history.push("/workforceIndex/" + item.category, { name: item, id: id });
  };

  var count = 0;

  const fetchCatagoryLevelList = async (entityName = null) => {
    try {
      const endpoint = entityName
        ? `categories/subcategories?entityName=${entityName}`
        : "categories/subcategories";

      const response = await getHttp(endpoint);
      setsubcategoryLevelList(response);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const totalEmployeeCalc = (subcat, size, currentLoop) => {
    var numOfEmployee = subcat.reduce((sum, item) => sum + item.count, 0);
    overallEmployee = overallEmployee + numOfEmployee;
    return numOfEmployee;
  };

  const totalSum = () => {
    const grandTotal = subcategoryLevelList.reduce((sum, category) => {
      return (
        sum +
        category.details.reduce((categorySum, subcategory) => {
          return categorySum + subcategory.count;
        }, 0)
      );
    }, 0);
    return grandTotal;
  };

  const findEmployeesByLevel = (level, subcat, event) => {
    const barPosition = {
      x: event.pageX,
      y: event.pageY,
    };
    var response;
    if (level) {
      response = getHttp("employeeByLevelAndSubcat", {
        level: level,
        subcat: subcat,
        entityName: userDetailsObj?.entity,
      })
        .then((response) => {
          setTablePopupData(response);

          setPopupPosition(barPosition);
          //setPopupPosition({ popupX: popupX, popupY: popupY });
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    } else {
      response = getHttp("employeeBySubcat", {
        subcat: subcat,
        entityName: userDetailsObj?.entity,
      })
        .then((response) => {
          setTablePopupData(response);

          setPopupPosition(barPosition);
          //setPopupPosition({ popupX: popupX, popupY: popupY });
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    }
  };

  const handleClosePopover = () => {
    setTablePopupData(null); // Clear the popover data to close it
  };

  return (
    <div className="main-container content-top-margin">
      <SubHeader pageHeadding="workforce index" showBreadcrumbs={true} />
      {/* <div className="main-heading"></div> */}
      <div className="seperate-employee-counter">
        {mainCategoryListByCount?.map((item, index) => (
          <div
            className="each-counter"
            key={index}
            onClick={() => {
              if (item.count > 0) {
                goToCategoryDetailsPage(item.id, item);
              }
            }}
          >
            <div className="sub-heading">{item.category}</div>
            <div className="counter-details">
              <div className="number-employees-text"># of Resources </div>
              <div
                className={item.count > 0 ? "clickable-count" : "zero-count"}
              >
                {" "}
                {item?.count}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="content category-chart">
        <Doughnut
          details={mainCategoryListByCount}
          heading="Percentage of resources per category"
          showLegend={true}
        />
      </div>
      <div className="list-container">
        <table className="table">
          <thead>
            <tr className="table-heading">
              <th className="each-column-border">Category name</th>
              <th className="each-column-border">Subcategory name</th>

              {levelArray.map((item, index) => (
                <th key={index} className="each-column-border">
                  Level {index + 1}
                </th>
              ))}
              <th className="each-column-border"># of employees</th>
              <th className="each-column-border">Group</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {subcategoryLevelList?.map((element, index) => (
              <>
                <td
                  className="each-column-border"
                  rowSpan={element?.details?.length + 1}
                >
                  {element?.categoryname}
                </td>
                {element?.details.map((item, index1) => (
                  <tr
                    key={index1}
                    // className={index % 2 === 0 ? "even-row" : "odd-row"}
                    // className={selectedRow === index ? "highlight" : ""}
                    // onClick={() => clickedOnSubcategory(item, index)}
                  >
                    <td className="each-column-border">{item.subcategory}</td>
                    {item.levelCounts.map((count, num) => (
                      <td
                        onClick={(e) =>
                          findEmployeesByLevel(num + 1, item.subcategory, e)
                        }
                        key={num}
                        className={`each-column-border popup-position ${
                          count > 0 ? "underline" : ""
                        }`}
                      >
                        {count == 0 ? "" : count}
                      </td>
                    ))}
                    <td
                      onClick={(e) =>
                        findEmployeesByLevel(null, item.subcategory, e)
                      }
                      className={`each-column-border popup-position ${
                        item.count > 0 ? "underline" : ""
                      }`}
                    >
                      {item.count == 0 ? "" : item.count}
                    </td>
                    {index1 === 0 ? (
                      <td
                        rowSpan={element.details.length}
                        className="each-column-border"
                      >
                        {totalEmployeeCalc(
                          element.details,
                          element?.details?.length,
                          index1
                        )}
                        {/* { element.details.reduce(
                          (sum, item) => sum + item.count,
                          0 
                        )} */}
                        {/* {catOne.reduce((sum, item) => sum + item.count, 0)} */}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </>
            ))}
            <tr>
              <td className="each-column-border" colSpan={11}></td>
              <td className="each-column-border">{"grand Total"}</td>
              <td className="each-column-border" colSpan={4}>
                {totalSum()}
              </td>
            </tr>
            {tablePopupData && tablePopupData.length > 0 && (
              <Popover
                tablePopupData={tablePopupData}
                popoverPosition={popupPosition}
                onClose={handleClosePopover}
              />
            )}
          </tbody>
        </table>
        {}
      </div>
    </div>
  );
};

export default CategoryList;
