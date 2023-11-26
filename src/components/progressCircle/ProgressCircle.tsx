import React, { useEffect, useState } from "react";
import { alertColor } from "../../service/Service";

import "./ProgressCircle.css";

const ProgressCircle = ({
  progress,
  size,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
  reverse,
}) => {
  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    //const progressOffset = ((100 - progress) / 100) * circumference;
    const progressOffset = (progress / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, circumference, progress, offset]);

  const strokeDashoffset = reverse ? circumference - offset : offset;
  const progressBarColor = alertColor(progress);

  return (
    <svg className="progress-circle" width={size} height={size}>
      <circle
        className="progress-circle__background"
        stroke={circleOneStroke}
        fill="#d9edfe"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="progress-circle__progress"
        stroke={progressBarColor}
        fill="transparent"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
      <text
        // x={center}
        // y={center}
        // className="progress-circle__text"
        // fill="#000"
        x={center}
        y={center}
        className="progress-circle__text"
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
      >{`${progress}%`}</text>
    </svg>
  );
};

export default ProgressCircle;
