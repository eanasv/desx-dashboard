import React, { useEffect, useState } from "react";
import "./JobChart.css";

interface JobChartInterface {
  item?: any;
}

export const JobChart: React.FC<JobChartInterface> = ({ item }) => {
  const [headingArray, setHeadingArray] = useState(item);
  console.log(item);
  useEffect(() => {
    setHeadingArray(item);
  }, [item]);

  return (
    <div id="flowBoxes" className="flowchart">
      {/* x */}

      {/* <div className="left right">Varianten</div>
      <div className="left right">Bedrukkingen</div>
      <div className="left">Bevestiging</div> */}

      <div className="bar">
        {headingArray.map((item, index) => (
          <div
            key={index}
            className={`bar-step ${item.active ? "active" : ""}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobChart;
