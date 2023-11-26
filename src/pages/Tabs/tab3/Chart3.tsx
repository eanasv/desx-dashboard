import React, { useEffect, useState } from "react";
import { BarChart } from "../../../components/Graph/barChart/BarChart";
import Component1 from "../../../components/test/Component1";
import { getHttp } from "../../../service/APIRequest";

interface Chart3Props {
  startDate: any;
  endDate: any;
  selectedEntityList?: any;
  entityList?: any;
  //fetchChart3Data?: any;
}
export const Chart3: React.FC<Chart3Props> = ({
  // startDate,
  // endDate,
  selectedEntityList,
  entityList,
  // fetchChart3Data,
}) => {
  const [chartData, setchartData] = useState<any>();
  const [xAxis, setxAxis] = useState([]);
  // const [dateRangeProps, setdateRangeProps] = useState({
  //   fromDate: startDate,
  //   toDate: endDate,
  // });

  const [selectedEntities, setselectedEntities] =
    useState<any>(selectedEntityList);
  const [allEntityList, setallEntityList] = useState(entityList);

  const [title, setTitle] = useState(selectedEntityList.map((item) => item));

  useEffect(() => {
    setallEntityList(allEntityList);
    setselectedEntities(selectedEntityList);
    getScoreOfSelectedEntity(selectedEntityList);
    setTitle(selectedEntityList.map((item) => item));
  }, [selectedEntityList]);

  useEffect(() => {
    getScoreOfSelectedEntity();
  }, []);

  // useEffect(() => {
  //   const today = new Date();
  //   const defaultEndDate = today.toISOString().slice(0, 10);
  //   const oneYearAgo = new Date(
  //     today.getFullYear() - 1,
  //     today.getMonth(),
  //     today.getDate()
  //   );
  //   const defaultStartDate = oneYearAgo.toISOString().slice(0, 10);
  //   setTimeout(() => {
  //     setStartDate(defaultStartDate);
  //     setEndDate(defaultEndDate);
  //   }, 110);
  // }, []);

  const getScoreOfSelectedEntity = async (selectedEntities?) => {
    var entityLists = selectedEntities;
    if (entityLists?.length == 0) {
      entityLists = entityList?.map((item) => item.label);
    }
    if (entityList && entityList.length > 0) {
      const response = await getHttp("skills/skill-ranks", {
        entityNames: entityLists.join(","),
      });
      await drawChart(response);
      //fetchChart3Data(response);
    }
  };

  async function drawChart(responseData?) {
    // var dataOfChart = [
    //   {
    //     name: "Improvement over last year", //chartData?.map((company) => company.entityName),
    //     data: responseData?.map((company) => company.avg_score_diff),
    //   },
    // ];
    var xAxisdata = responseData?.map((company) => company.year);
    setxAxis(xAxisdata);
    setchartData(responseData?.map((company) => company.score));
  }

  return (
    <div className="chart-bg entity-list">
      {selectedEntities?.length == entityList?.length
        ? "All"
        : selectedEntities.map((item) => item + ", ")}
      <BarChart
        data={chartData}
        xAxis={xAxis}
        title={"Analysis of score for last years"}
        name="Improvement over last year"
        width={550}
      />
    </div>
  );
};
