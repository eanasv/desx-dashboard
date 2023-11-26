import React, { useEffect, useState } from "react";
import { skillMaximumScoreValue } from "../../service/Constants";
import { alertColor, calculatePercent } from "../../service/Service";

const ProgressBar = (props) => {
  const [percentage, setPercentage] = useState<any>(); // set initial percentage value

  useEffect(() => {
    getPercentageValue();
  }, []);

  const getPercentageValue = () => {
    setPercentage(calculatePercent(props.score, skillMaximumScoreValue));
  };

  const progressBarColor = alertColor(percentage);

  const progressBarStyles = {
    width: `${percentage}%`, // set width of progress bar based on percentage
    background: `${progressBarColor}`,
  };
  const progressBarContainer = {
    borderColor: `${progressBarColor}`,
  };

  return (
    <div className="progress-bar-container" style={progressBarContainer}>
      <div className="progress-bar" style={progressBarStyles}></div>
    </div>
  );
};

export default ProgressBar;
