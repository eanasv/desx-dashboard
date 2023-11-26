import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "../Chart.css";

interface donutChartInterface {
  details?: any;
  heading: String;
}

const DonutChart: React.FC<donutChartInterface> = ({ details, heading }) => {
  // var data1 = {
  //   labels: details?.map((item) => item.category),
  //   datasets: [
  //     {
  //       label: "# of Employees",
  //       data: details?.map((item) => item.count),
  //       backgroundColor: [
  //         "#a2d6c4",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //       ],
  //       borderColor: ["white", "white", "white"],
  //       borderWidth: 3,
  //     },
  //   ],
  //   // options: {
  //   //   plugins: {
  //   //     datalabels: {
  //   //       formatter: (value) => {
  //   //         return value + "%";
  //   //       },
  //   //     },
  //   //   },
  //   // },
  // };

  const [display, setDisplay] = useState(false);
  const data = {
    options: {
      labels: details?.map((item) => item.category),
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="custom-tooltip">' +
            "<span># of Employees<br/>" +
            w.config.labels[seriesIndex] +
            " - </span>" +
            "<span>" +
            series[seriesIndex] +
            "</span>" +
            "</div>"
          );
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              //show: true,
              position: "top",
              floating: true,
            },
          },
        },
      ],
    },
    series: details?.map((item) => item.count),
  };

  useEffect(() => {
    setTimeout(() => setDisplay(true), 100);
  }, []);

  if (!display) {
    return <></>;
  }

  return (
    <div>
      <div
        className="donut-heading"
        hidden={details?.length <= 0}
        //className={multiLayer ? "center-heading" : ""}
      >
        {heading}
      </div>

      <div className="mixed-chart">
        <Chart
          options={data?.options}
          series={data?.series}
          type="donut"
          width="500"
        />
      </div>
    </div>
  );
};

export default DonutChart;
