import React, { useEffect, useState } from "react";
import { DateRangeFilter } from "../../../components/dateRangeFilter/DateRangeFilter";
import DropDown from "../../../components/dropDown/DropDown";
import { SubHeader } from "../../../components/subHeader/SubHeader";
import { getHttp } from "../../../service/APIRequest";
import "../Tabs.css";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import { Chart3 } from "./Chart3";
import { Chart4 } from "./Chart4";
import { SummaryTable } from "./SummaryTable";

const Tab3 = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartOneData, setchartOneData] = useState();
  const [entityListForDropDown, setentityListForDropDown] = useState([]);
  const [chart3Data, setchart3Data] = useState();
  const [selectedItemDropdown, setselectedItemDropdown] = useState([]);

  const [data, setData] = useState("");

  const handleDataChange = (newData) => {
    setData(newData);
  };

  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString);
  console.log(userDetailsObj?.entity);

  useEffect(() => {
    if (userDetailsObj?.entity) {
      var userEntity = [userDetailsObj?.entity];
      setselectedItemDropdown(userEntity);
      setentityListForDropDown([{ label: userEntity, vaue: userEntity }]);
    } else {
      getEntityList();
    }
    // drawBarChart(startDate, endDate);
  }, []);

  useEffect(() => {}, [startDate, endDate]);

  const getEntityList = async () => {
    const response = await getHttp("entity/getNameDetails");
    await setentityListForDropDown(response);
    await setselectedItemDropdown(response?.map((item) => item.label));
  };

  const fetchChartData = (data) => {
    if (data) {
      setchartOneData(data);
    } else {
      setchartOneData(null);
    }
    //}, 11);
  };

  const handleChangeValue = (data) => {
    setchartOneData(null);
    setselectedItemDropdown(data?.map((item) => item.label));
    //console.log(data.length);
    if (data.length == 1) {
    }
  };

  // const drawLineChart = async (startDateParam, endDateParam) => {
  //   fetchDates(startDateParam, endDateParam);
  //   if (startDateParam && endDateParam) {
  //     const response = await getHttp("skills/companyAverageScore", {
  //       startDate: startDateParam,
  //       endDate: endDateParam,
  //     });
  //     fetchChartData(response);

  //     return { startDate, endDate };
  //   }
  //   return null;
  // };

  // const drawBarChart = async (startDateParam, endDateParam) => {
  //   const response = await getHttp("skills/skill-ranks", {
  //     startDate: startDateParam,
  //     endDate: endDateParam,
  //   });
  //   // setTimeout(() => {
  //   setchart3Data(response);
  //   // }, 11);
  // };

  const fetchDates = (fromDate, toDate) => {
    setStartDate(fromDate);
    setEndDate(toDate);
  };

  const fetchChart4Data = (data) => {
    //setsummaryData(data);
    // console.log(data.map((item) => item.companyName));
  };

  return (
    <div className="content-top-margin ">
      <SubHeader
        pageHeadding="digital historical scoring"
        showBreadcrumbs={true}
      />
      {/* <div className="main-heading">Digital skills historical scoring</div> */}
      <div className="tab3-filter-container">
        {!userDetailsObj?.entity && (
          <DropDown
            mainList={entityListForDropDown}
            name="Entity"
            onChangeDropDownItem={handleChangeValue}
            isMulti={true}
            classname="margin"
          />
        )}
        <DateRangeFilter
          fetchChartData={fetchChartData}
          fetchDates={fetchDates}
          selectedEntityList={selectedItemDropdown}
          entityList={entityListForDropDown}
        />
      </div>
      <div className="tab3-contentainer">
        <div className="tab3-first-row">
          <div className="flex-box-chart1">
            <Chart1 data={chartOneData} entityName={selectedItemDropdown} />
          </div>
          {!userDetailsObj?.entity && (
            <div className="flex-box-chart2">
              <Chart2
                startDate={startDate}
                endDate={endDate}
                entityListForDropDown={entityListForDropDown}
              />
            </div>
          )}
        </div>
        <div className="tab3-sec-row">
          <div className="flex-box-chart1">
            <Chart3
              startDate={startDate}
              endDate={endDate}
              selectedEntityList={selectedItemDropdown}
              entityList={entityListForDropDown}
              //fetchChart3Data={fetchChart3Data}
            />
          </div>
          <div className="flex-box-chart2">
            <Chart4
              selectedEntityList={selectedItemDropdown}
              entityList={entityListForDropDown}
              fetchChart4Data={fetchChart4Data}
            />
          </div>
        </div>
        {/* {summaryData && ( */}
        {!userDetailsObj?.entity && (
          <div className="summary-table">
            <div className="summary-text">Summary</div>
            <SummaryTable entityList={entityListForDropDown} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab3;
