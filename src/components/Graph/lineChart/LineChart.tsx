import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";

const LineChart = ({ data, xAxis, title }) => {
  const [dataSeries, setdataSeries] = useState(data || []);
  const [option, setOption] = useState<any>({
    legend: {
      show: false,
    },
    xaxis: {
      categories: xAxis,
      labels: {
        hideOverlappingLabels: true,
      },
    },
    title: {
      text: title,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Bukra",
        color: "Black",
      },
    },
    yaxis: {
      forceNiceScale: true,
    },
  });

  useEffect(() => {
    setdataSeries(data);

    if (data) {
      const categories = data?.map((item) => item.category);
      setOption((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState.xaxis,
          categories: xAxis,
        },
      }));
    }
  }, [data]);

  const series = dataSeries;

  return (
    <div>
      <Chart options={option} series={dataSeries} type="line" width="550" />
    </div>
  );
};

export default LineChart;
