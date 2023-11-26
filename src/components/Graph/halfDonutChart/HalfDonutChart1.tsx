import React from "react";
import { Doughnut } from "react-chartjs-2";

const HalfDonutChart = () => {
  const chartData = {
    labels: ["Red", "Green", "Blue"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: any = {
    cutoutPercentage: 70,
    rotation: -Math.PI,
    circumference: Math.PI,
    animation: {
      animateRotate: false,
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      centerImage: {
        url: "../../../assets/compass.png",
        width: 50,
        height: 50,
        rotate: 0,
        angle: 0,
      },
    },
  };

  const handleElementsClick = (elems, event) => {
    if (elems.length > 0) {
    }
  };

  const handleMouseMove = (event, chartElement) => {
    if (chartElement.length > 0) {
      event.target.style.cursor = "pointer";
    } else {
      event.target.style.cursor = "default";
    }
  };

  return (
    <Doughnut
      data={chartData}
      options={chartOptions}
      // getElementAtEvent={handleElementsClick}
      // onHover={handleMouseMove}
    />
  );
};

export default HalfDonutChart;
