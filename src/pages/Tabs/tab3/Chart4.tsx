import React, { useEffect, useState } from "react";
import { BarChart } from "../../../components/Graph/barChart/BarChart";
import { getHttp } from "../../../service/APIRequest";

interface Chart4Props {
  selectedEntityList?: any;
  entityList?: any;
  fetchChart4Data?: any;
}
export const Chart4: React.FC<Chart4Props> = ({
  selectedEntityList,
  entityList,
  fetchChart4Data,
}) => {
  const [chartData, setchartData] = useState<any>();
  const [xAxis, setxAxis] = useState([]);
  const [selectedEntities, setselectedEntities] = useState(selectedEntityList);
  const [allEntityList, setallEntityList] = useState(entityList);

  useEffect(() => {
    setallEntityList(allEntityList);
    setselectedEntities(selectedEntityList);
    getScoreOfEntityLatestDate(selectedEntityList);
  }, [selectedEntityList]);

  const getScoreOfEntityLatestDate = async (selectedEntities?) => {
    var entityLists = selectedEntities;
    if (entityLists?.length == 0) {
      entityLists = entityList?.map((item) => item.label);
    }
    if (entityLists?.length > 0) {
      getHttp("skills/latestScore", {
        entityNames: entityLists?.join(","),
      })
        .then((response) => {
          drawChart(response);
          fetchChart4Data(response);

          // handle success
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    }
  };

  const drawChart = (responseData?) => {
    var xAxisdata = responseData?.map((company) => company.companyName);
    setxAxis(xAxisdata);
    setchartData(
      responseData?.map((company) => company.monthlyAverages[0].averageScore)
    );
  };

  return (
    <div className="chart-bg">
      <BarChart
        data={chartData}
        xAxis={xAxis}
        title={"Latest Score"}
        name="Latest Score"
        width={550}
        //yAxis={"Latest score of " + responseData[0].monthlyAverages[0].month}
      />
    </div>
  );
};
