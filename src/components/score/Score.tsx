import React from "react";
import "../entityBox/EntityBox.css";

const Score = ({ score }) => {
  return (
    <div
      className={[
        "entity-score",
        score >= 80
          ? "green-value"
          : 79 > score && score > 60
          ? "orange-value"
          : "red-value",
      ].join(" ")}
    >
      <div className="score-value">{score ? score : 0}%</div>
      <div className="score-text">Score</div>
    </div>
  );
};

export default Score;
