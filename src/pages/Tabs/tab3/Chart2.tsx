import React, { useEffect, useState } from "react";
import DropDown from "../../../components/dropDown/DropDown";
import LineChart from "../../../components/Graph/lineChart/LineChart";
import { getHttp } from "../../../service/APIRequest";

interface Chart2Props {
  startDate: any;
  endDate: any;
  entityListForDropDown: any;
}
const Chart2: React.FC<Chart2Props> = ({
  startDate,
  endDate,
  entityListForDropDown,
}) => {
  const [selectList1Entity, setSelectList1Entity] = useState(
    entityListForDropDown
  );
  const [selectList2Entity, setSelectList2Entity] = useState(
    entityListForDropDown
  );
  const [chartData, setchartData] = useState([]);
  const [xAxis, setxAxis] = useState([]);
  const [dateRangeProps, setdateRangeProps] = useState({
    fromDate: startDate,
    toDate: endDate,
  });
  const [dropdownValues, setdropdownValues] = useState({
    firstDValue: "", //firstDropDownValue,
    secondDValue: "", //secondDropDownValue,
  });

  useEffect(() => {
    setSelectList1Entity(entityListForDropDown);
    setSelectList2Entity(entityListForDropDown);
    getScoreOfSelectedEntities(
      dropdownValues.firstDValue,
      dropdownValues.secondDValue
    );
    getScoreOfSelectedEntities(
      dropdownValues.secondDValue,
      dropdownValues.secondDValue
    );
  }, [startDate, endDate, dateRangeProps]);

  useEffect(() => {
    setSelectList1Entity(entityListForDropDown);
    setSelectList2Entity(entityListForDropDown);
  }, [entityListForDropDown]);

  // const getEntityList = async () => {
  //   const response = await getHttp("entity/getAll");
  //   await setSelectList1Entity(response);
  //   await setSelectList2Entity(response);
  //   //setentityListForDropDown(response);
  // };

  function handleChange1Value(selectedOption) {
    setdropdownValues((prevState) => ({
      ...prevState,
      firstDValue: selectedOption.label,
    }));
    if (dropdownValues.secondDValue) {
      getScoreOfSelectedEntities(
        selectedOption.label,
        dropdownValues.secondDValue
      );
    }
    //getScoreOfSelectedEntity(selectedOption.label);
  }

  function handleChange2Value(selectedOption) {
    setdropdownValues((prevState) => ({
      ...prevState,
      secondDValue: selectedOption.label,
    }));
    if (dropdownValues.firstDValue) {
      getScoreOfSelectedEntities(
        dropdownValues.firstDValue,
        selectedOption.label
      );
    }
    //getScoreOfSelectedEntity(selectedOption.label);
  }

  // async function drawChart(responseData?) {
  //   var dataOfOneChart = {
  //     name: responseData[0]?.companyName,
  //     data: responseData[0]?.monthlyAverages?.map((monthlyAverage) => {
  //       return monthlyAverage.averageScore;
  //     }),
  //   };
  //   var xAxisdata = responseData[0].monthlyAverages?.map((monthlyAverage) => {
  //     return monthlyAverage.month;
  //   });
  //   setxAxis(xAxisdata);
  //   setchartData((prevState) => [...prevState, dataOfOneChart]);
  // }

  function drawChart(responseData1, responseData2) {
    const dataOfOneChart1 = {
      name: responseData1[0]?.companyName,
      data: responseData1[0]?.monthlyAverages?.map((monthlyAverage) => {
        return monthlyAverage.averageScore;
      }),
    };
    const dataOfOneChart2 = {
      name: responseData2[0]?.companyName,
      data: responseData2[0]?.monthlyAverages?.map((monthlyAverage) => {
        return monthlyAverage.averageScore;
      }),
    };
    const xAxisData = responseData1[0].monthlyAverages?.map(
      (monthlyAverage) => {
        return monthlyAverage.month;
      }
    );
    setxAxis(xAxisData);
    setchartData([dataOfOneChart1, dataOfOneChart2]);
  }

  const getScoreOfSelectedEntities = async (entity1, entity2) => {
    // if (entityName) {
    //   const response = await getHttp("skills/averageScoreOfEntity", {
    //     startDate: startDate,
    //     endDate: endDate,
    //     entityName: entityName,
    //   });
    //   drawChart(response);
    // } else {
    //   drawChart();
    // }

    if (entity1 && entity2) {
      const response1 = await getHttp("skills/averageScoreOfEntity", {
        startDate: startDate,
        endDate: endDate,
        entityName: entity1,
      });
      const response2 = await getHttp("skills/averageScoreOfEntity", {
        startDate: startDate,
        endDate: endDate,
        entityName: entity2,
      });
      drawChart(response1, response2);
    }
  };

  return (
    <div className="chart-bg">
      <div className="drop-down-tab3">
        <DropDown
          mainList={selectList1Entity}
          name="First Entity"
          onChangeDropDownItem={handleChange1Value}
          isMulti={false}
          classname="margin"
        />
        <DropDown
          mainList={selectList2Entity}
          name="Second Entity"
          onChangeDropDownItem={handleChange2Value}
          isMulti={false}
        />
      </div>
      <LineChart data={chartData} xAxis={xAxis} title="Compare 2 entities" />
    </div>
  );
};

export default Chart2;
