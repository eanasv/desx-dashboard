import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../Chart.css";

interface radialChartInterface {
  details?: any;
  heading: String;
}

const RadialBarChart: React.FC<radialChartInterface> = ({
  details,
  heading,
}) => {
  const [series, setSeries] = useState(details?.map((item) => item.count));
  const [option, setoption] = useState({
    height: 450,
    chart: {
      height: 400, // set the height to 400px
      width: 400,
    },
    labels: details?.map((item) => item.category),
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      labels: {
        colors: "#333",
        useSeriesColors: false,
        formatter: function (value, { seriesIndex, w }) {
          return details.labels[seriesIndex] + ": " + value + "%";
        },
      },
      // chart: {
      //   width: 900, // Adjust the width
      //   height: 900,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 600,
          },
        },
      },
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          // margin: 15,
          // size: "60%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
        },
      },
    },
  });
  // const data = {
  //   options: {
  //     labels: details?.map((item) => item.category),
  //     legend: {
  //       show: true,
  //       showForSingleSeries: false,
  //       showForNullSeries: true,
  //       showForZeroSeries: true,
  //       //position: "top",
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //         },
  //       },
  //     ],
  //     plotOptions: {
  //       radialBar: {
  //         hollow: {
  //           margin: 15,
  //           size: "60%",
  //           background: "transparent",
  //           image: undefined,
  //         },
  //         dataLabels: {
  //           name: {
  //             show: true,
  //           },
  //           value: {
  //             show: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   series: details?.map((item) => item.count),
  // };

  useEffect(() => {
    //setTimeout(() => setDisplay(true), 100);
    setoption((prevState) => ({
      ...prevState,
      labels: details?.map((item) => item.category),
    }));
    setSeries(details?.map((item) => item.avgachieved_score));
  }, [details]);

  return (
    // <div className="mixed-chart">
    //   <div className="radialHeading" hidden={details?.length <= 0}>
    //     {heading}
    //   </div>

    <div className=" chart-bg">
      <div
        className="donut-heading"
        hidden={details?.length <= 0}
        //className={multiLayer ? "center-heading" : ""}
      >
        {heading}
      </div>
      <Chart
        options={option}
        series={series}
        type="radialBar"
        width="490"
        height="400"
      />
    </div>
  );
};

export default RadialBarChart;
