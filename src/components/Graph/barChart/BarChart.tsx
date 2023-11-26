import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Popover } from "../../popup/Popover";
import "../Chart.css";
import "./BarChartPopup.css";

interface BarChartInterface {
  data;
  xAxis;
  title?;
  name?;
  width?: any;
  eachBarClicked?: any;
  barChartPopoverdata?: any;
  subTitle?: any;
  closePopover?: any;
}

export const BarChart: React.FC<BarChartInterface> = ({
  data,
  xAxis,
  title,
  name,
  width,
  eachBarClicked,
  barChartPopoverdata,
  subTitle,
  closePopover,
}) => {
  const [dataSeries, setdataSeries] = useState<any>([
    {
      name: title, //will be displayed on the y-axis
      data: data,
    },
  ]);

  const [subTitles, setsubTitles] = useState<any>({
    title: title,
    subTitle: title,
  });
  const [popupPosition, setPopupPosition] = useState(null);
  const barRef = useRef(null);
  const [popupData, setPopupData] = useState(barChartPopoverdata);
  const [option, setOption] = useState<any>({
    legend: {
      show: false,
    },
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const dataPointIndex = config.dataPointIndex;
          const selectedXValue = option.xaxis.categories[dataPointIndex];
          eachBarClick(selectedXValue, event);
        },
      },
    },
    xaxis: {
      categories: xAxis,
    },
    title: {
      text: title,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Bukra",
        color: "black",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: 50,
        colors: {
          ranges: [
            {
              from: -100,
              to: 0,
              color: "#b70849",
            },
            {
              from: 0,
              to: 100,
              color: "#1034a6",
            },
          ],
        },
      },
    },
    // dataLabels: {
    //   enabled: true,
    //   formatter: function (val, opts) {
    //     const isPositive = val >= 0;
    //     return isPositive && type == "progress" ? `+${val}` : val.toString();
    //   },
    // },
    yaxis: {
      forceNiceScale: true,
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
  });

  useEffect(() => {
    setPopupData(barChartPopoverdata);
    setsubTitles((prevState) => ({ ...prevState, subTitle: title }));
    if (data) {
      setdataSeries([
        {
          name: name,
          data: data,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    setsubTitles((prevState) => ({ ...prevState, subTitle: title }));
  }, []);

  useEffect(() => {
    //setdataSeries(data);
    //if (data) {
    //const categories = data.map((item) => item);
    //setsubTitles(subTitle);
    setsubTitles((prevState) => ({ ...prevState, subTitle: title }));
    setPopupData(barChartPopoverdata);
    if (data) {
      setdataSeries([
        {
          name: name,
          data: data,
        },
      ]);
    }
    setOption((prevState) => ({
      ...prevState,
      title: {
        text: title,
      },
      xaxis: {
        categories: xAxis,
      },
      chart: {
        events: {
          dataPointSelection: handleDataPointSelection,
        },
      },
    }));

    const handleDataPointSelection = (event, chartContext, config) => {
      const dataPointIndex = config.dataPointIndex;
      const selectedXValue = xAxis[dataPointIndex];
      eachBarClick(selectedXValue, event);
    };

    // setOption((prevOption) => ({
    //   ...prevOption,
    //   chart: {
    //     events: {
    //       dataPointSelection: handleDataPointSelection,
    //     },
    //   },
    // }));
  }, [xAxis]);

  const xLabelToIndexMap = {};
  option.xaxis.categories.forEach((label, index) => {
    xLabelToIndexMap[label] = index;
  });

  const eachBarClick = (value, event) => {
    const barPosition = {
      x: event.clientX - 125,
      y: 200, //event.clientY,
    };
    eachBarClicked ? eachBarClicked(value, title) : console.log("noo function");
    setPopupPosition(barPosition);
  };

  //this is to add class name to x-xis label
  const wrapXAxisLabels = (chartContext, { axis, tick, text }) => {
    if (axis === "xaxis") {
      tick.classList.add("apexchart-xaxis-label");
    }
  };

  const handleClosePopover = () => {
    setPopupData(null); // Clear the popover data to close it
    closePopover();
  };

  return (
    <div className="bar-chart">
      {/* onClick={() => setPopupData(null)} */}
      <Chart
        options={option}
        series={dataSeries}
        type="bar"
        height={350}
        width={width ? 550 : "100%"}
        events={{
          dataPointSelection: wrapXAxisLabels, // Apply the class to x-axis labels
        }}
      />
      {barChartPopoverdata && (
        <Popover
          tablePopupData={barChartPopoverdata}
          popoverPosition={popupPosition}
          onClose={handleClosePopover}
        />
      )}
    </div>
  );
};
