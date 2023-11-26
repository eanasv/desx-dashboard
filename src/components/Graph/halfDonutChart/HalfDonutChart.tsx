import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, PointElement } from "chart.js";
import Compass from "../../compass/Compass";

const HalfDonutChart = () => {
  Chart.register(ArcElement, PointElement);

  const data = {
    datasets: [
      {
        data: [3, 10, 10],
        backgroundColor: ["#336699", "#99CCFF", "#999933"],
        display: true,
        borderColor: "#D1D6DC",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centerImage: {
        url: Compass,
        width: "260px",
        height: "260px",
        rotate: -90,
        angle: 0,
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    maintainAspectRatio: true,
    responsive: true,
    onBeforeDraw: function (chart, args, options) {
      const ctx = chart.ctx;
      const centerImage = options.plugins.centerImage;

      // Rotate the canvas to the compass angle
      const angle = (centerImage.angle * Math.PI) / 180;
      ctx.translate(chart.width / 2, chart.height * 0.55);
      ctx.rotate(angle);

      // Draw the compass image
      const img = new Image();
      img.src = centerImage.url;
      const x = -centerImage.width / 2;
      const y = -centerImage.height / 2;
      ctx.drawImage(img, x, y, centerImage.width, centerImage.height);

      // Reset the canvas rotation
      ctx.rotate(-angle);
      ctx.translate(-chart.width / 2, -chart.height * 0.55);
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          height: "500px",
          width: "500px",
        }}
      >
        <div>Text Here</div>
      </div>
    </div>
  );
};

export default HalfDonutChart;
