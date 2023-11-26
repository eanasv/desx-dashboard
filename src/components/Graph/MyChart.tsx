import React from "react";

import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

// const data = {
//   datasets: [
//     {
//       data: [10, 20, 30],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.5)",
//         "rgba(54, 162, 235, 0.5)",
//         "rgba(255, 206, 86, 0.5)",
//       ],
//       datalabels: {
//         color: (context) => context.dataset.backgroundColor[context.dataIndex],
//         anchor: "end",
//         align: "start",
//       },
//     },
//     {
//       data: [5, 15, 25],
//       backgroundColor: [
//         "rgba(75, 192, 192, 0.5)",
//         "rgba(153, 102, 255, 0.5)",
//         "rgba(255, 159, 64, 0.5)",
//       ],
//       datalabels: {
//         color: (context) => context.dataset.backgroundColor[context.dataIndex],
//         anchor: "center",
//         align: "center",
//       },
//     },
//     {
//       data: [2, 4, 6],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//       ],
//       datalabels: {
//         color: (context) => context.dataset.backgroundColor[context.dataIndex],
//         anchor: "start",
//         align: "end",
//       },
//     },
//   ],
// };

const data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ["red", "blue", "green"],
      label: "Layer 1",
    },
    {
      data: [5, 15, 25],
      backgroundColor: ["orange", "purple", "yellow"],
      label: "Layer 2",
    },
    {
      data: [2, 8, 12],
      backgroundColor: ["pink", "gray", "brown"],
      label: "Layer 3",
    },
  ],
};

const options = {
  plugins: {
    datalabels: {
      font: {
        size: 14,
      },
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  },
};

const MyChart = () => {
  return <Doughnut data={data} options={options} />;
};

export default MyChart;
