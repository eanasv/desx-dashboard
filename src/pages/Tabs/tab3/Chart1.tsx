import React, { useEffect, useState } from "react";
import LineChart from "../../../components/Graph/lineChart/LineChart";

interface Chart1props {
  data?: any;
  entityName?: any;
}

const Chart1: React.FC<Chart1props> = ({ data, entityName }) => {
  const [xAaxis, setXAxis] = useState([]);
  const [chartData, setchartData] = useState(data);

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    if (data && data.length > 0) {
      const series = data?.map((company) => {
        return {
          name: company.companyName,
          data: company.monthlyAverages?.map((monthlyAverage) => {
            return monthlyAverage.averageScore;
          }),
        };
      });
      setchartData(series);
      const xAxis = data?.map((company) => {
        return company.monthlyAverages?.map((monthlyAverage) => {
          if (company.monthlyAverages.length == 1) {
            //
            return monthlyAverage.month;
          } else {
            return monthlyAverage.month;
          }
        });
        //return month;
      });
      const dataArray = xAxis[xAxis.length - 1]; // Example array with more than 8 elements

      let truncatedArray = [...dataArray]; // Create a copy of the original array

      if (truncatedArray.length > 8) {
        const removeCount = truncatedArray.length - 8; // Calculate the number of elements to remove

        for (let i = 2; i < truncatedArray.length - 2; i++) {
          const randomIndex =
            Math.floor(Math.random() * (truncatedArray.length - 4)) + 2; // Generate a random index between 2 and length - 3
          truncatedArray.splice(randomIndex, 1); // Remove the element at the random index
        }
      }

      //console.log(truncatedArray); // The truncated array with a length of 8
      //setXAxis(truncatedArray);
      setXAxis(xAxis[xAxis.length - 1]);
    } else {
      console.log("No data to show for " + entityName);
    }
  };

  return (
    <div className="chart-bg">
      <LineChart data={chartData} xAxis={xAaxis} title="All entities" />
    </div>
  );
};

export default Chart1;
