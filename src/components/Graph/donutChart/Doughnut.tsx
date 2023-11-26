import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface donutChartInterface {
  details?: any;
  heading?: String;
  multiLayer?: boolean;
  showLegend: boolean;
}

const Doughnut: React.FC<donutChartInterface> = ({
  details,
  heading,
  multiLayer,
  showLegend,
}) => {
  //console.log(details);
  const [label, setLabel] = useState(details?.map((item) => item.category));
  const [dataSeries, setdataSeries] = useState(
    details?.map((item) => item.count)
  );
  const [option, setOption] = useState<any>({
    height: 450,
    chart: {
      height: 400, // set the height to 400px
      width: 400,
    },
    labels: details?.map((item) => item.category),
    plotOptions: {
      pie: {
        donut: {
          //size: "10%", // Adjust the size of the donut ring
        },
      },
    },

    legend: {
      show: showLegend,
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
      //labels: details?.map((item) => item.category),
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ".00" + " Rs";
          },
          title: {
            formatter: function (seriesName) {
              return "# of Employees in ";
            },
          },
        },
      },
    },
    // title: {
    //   text: "Dubai Skills %",
    //   style: {
    //     fontSize: "14px",
    //     fontWeight: "bold",
    //     fontFamily: "Bukra",
    //     color: "red",
    //   },
    // },
    // stroke: {
    //   width: 2,
    //   colors: ["#000"],
    // },
  });

  useEffect(() => {
    setLabel(details?.map((item) => item.category));
    setdataSeries(details?.map((item) => item.count));
    setOption((prevState) => ({
      ...prevState,
      //legend: { show: showLegend },
      labels: details?.map((item) => item.category),
    }));
  }, [details]);

  return (
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
        series={dataSeries}
        type="donut"
        width={400}
        height={400}
      />
    </div>
  );
};

export default Doughnut;
