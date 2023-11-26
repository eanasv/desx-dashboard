import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "../../components/Graph/barChart/BarChart";
import Doughnut from "../../components/Graph/donutChart/Doughnut";
import TestChart from "../../components/Graph/TestChart";
import { Popover } from "../../components/popup/Popover";
import { SubHeader } from "../../components/subHeader/SubHeader";
import { getHttp } from "../../service/APIRequest";
import "./CategoryDetails.css";

interface categoryDetailsProps {
  details1?: any;
  backButtonClicked?: any;
}

const CategoryDetails: React.FC<categoryDetailsProps> = ({
  details1,
  backButtonClicked,
}) => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [chartData, setchartData] = useState<any>();
  const [xAxis, setxAxis] = useState([]);
  const [barchartTitile, setbarchartTitile] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const location = useLocation();
  const [details, setdetails] = useState<any>(location.state);
  const [tablePopupData, setTablePopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  var levelArray = new Array(9).fill(0);

  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //userDetailsObj.entity

  useEffect(() => {
    fetchCatagoryList(details.id, userDetailsObj.entity);
  }, []);

  const fetchCatagoryList = async (param?, entityName = null) => {
    const endpoint = entityName
      ? `categories/${details.id}/subcategories?entityName=${entityName}`
      : `categories/${details.id}/subcategories`;
    const response = getHttp(endpoint)
      .then((response) => {
        console.log(response);

        setSubCategoryList(response); // handle success
        setSelectedRow(0);
        clickedOnSubcategory(response[0], 0, userDetailsObj.entity);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  // const clickedOnSubcategory = async (item, index) => {
  //   item.count > 0 ? setSelectedRow(index) : setSelectedRow(index);
  //   setbarchartTitile(item.category);
  //   const response = await getHttp(
  //     "categories/" + details.id + "/subcategory/" + item.id
  //   )
  //     .then((response) => {
  //       //console.log(response);
  //       setbarchartTitile(item.category);
  //       drawChart(response, item.category);

  //       // handle success
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // handle error
  //     });
  // };

  const clickedOnSubcategory = async (item, index, entityName) => {
    item.count > 0 ? setSelectedRow(index) : setSelectedRow(index);
    setbarchartTitile(item.category);

    let url = "categories/" + details.id + "/subcategory/" + item.id;
    if (entityName) {
      url += `?entityName=${entityName}`;
    }

    const response = await getHttp(url)
      .then((response) => {
        // Handle success
        setbarchartTitile(item.category);
        drawChart(response, item.category);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const drawChart = (responseData?, subcat?) => {
    setbarchartTitile(subcat);
    var xAxisdata = responseData?.map((item) => item.entityName);
    setxAxis(xAxisdata);
    setchartData(responseData?.map((item) => item.employeeNumber));
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
    // const response = getHttp("employeeByLevelAndSubcat", {
    //   level: level,
    //   subcat: subcat,
    // })
    //   .then((response) => {
    //     setTablePopupData(response);

    //     setPopupPosition(barPosition);
    //     //setPopupPosition({ popupX: popupX, popupY: popupY });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // handle error
    //   });
  };

  const eachBarClick = (value, subTitle) => {
    setPopupData(null);
    const response = getHttp("employeeByEntityAndSubcat", {
      entity: value,
      subcat: subTitle,
    })
      .then((response) => {
        setPopupData(response);
        //setPopupPosition({ popupX: popupX, popupY: popupY });
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  const handleClosePopover = () => {
    setTablePopupData(null); // Clear the popover data to close it
    setPopupData(null);
  };

  const popoverContainer = document.querySelector(".popover-container");
  const popoverArrow = document.querySelector(".popover-arrow");
  const targetElement = document.querySelector(".target-element");

  return (
    <div className="top-padding-sub content-top-margin">
      <SubHeader pageHeadding={details?.name.category} showBreadcrumbs={true} />
      {/* <div className="main-heading">{details?.name.category}</div> */}
      {details?.name.count > 0 && (
        <div className="chart-flex">
          <Doughnut
            heading={"Percentage of resources per subcategory"}
            details={subCategoryList}
            showLegend={false}
          />
        </div>
      )}
      {details?.name.count > 0 && (
        <div className="list-container">
          <table className="table">
            <thead>
              <tr className="table-heading">
                <th className="each-column-border main-head">
                  Subcategory name
                </th>

                {levelArray.map((item, index) => (
                  <th key={index} className="each-column-border main-head">
                    Level {index + 1}
                  </th>
                ))}
                <th className="each-column-border main-head">
                  # of employees( {subCategoryList[0]?.grantTotalEmp})
                </th>
              </tr>
            </thead>
            <tbody>
              {subCategoryList?.map((item, index) => (
                <tr
                  key={index}
                  className={[
                    // index % 2 === 0 ? "even-row" : "odd-row",
                    selectedRow === index ? "highlight" : "",
                  ].join(" ")}
                  onClick={() =>
                    clickedOnSubcategory(item, index, userDetailsObj.entity)
                  }
                >
                  <td className="each-column-border">{item.category}</td>
                  {item.levelCounts.map((count, num) => (
                    <td
                      onClick={(e) =>
                        findEmployeesByLevel(num + 1, item.category, e)
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
                      findEmployeesByLevel(null, item.category, e)
                    }
                    className={`each-column-border popup-position ${
                      item.count > 0 ? "underline" : ""
                    }`}
                  >
                    {item.count == 0 ? "" : item.count}
                  </td>
                </tr>
              ))}
              {tablePopupData && tablePopupData.length > 0 && (
                <Popover
                  tablePopupData={tablePopupData}
                  popoverPosition={popupPosition}
                  onClose={handleClosePopover}
                />
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* <div className="content1">
        <Doughnut details={subCategoryList} heading="Dubai Skills %" />
      </div> */}
      {chartData && xAxis && (
        <div className="barChart">
          {/* <DonutChart
              //details={chartDetails.data_analytics}
              heading={props.entityName + " skills"}
              details={roleCount}
            /> */}
          {/* <Doughnut
          heading={" skills (Number of employees in each category)"}
          details={subCategoryList}
        /> */}
          <BarChart
            data={chartData}
            xAxis={xAxis}
            // title={"Employee and entity details of  - " + barchartTitile}
            title={barchartTitile}
            name="Number of employees"
            eachBarClicked={eachBarClick}
            barChartPopoverdata={popupData}
            subTitle={barchartTitile}
            closePopover={handleClosePopover}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
