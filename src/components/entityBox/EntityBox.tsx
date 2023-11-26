import React from "react";
import Score from "../score/Score";
import "./EntityBox.css";

interface entityDetails {
  name?: String;
  logo?: String;
  totalEntityScore?: any;
}
const EntityBox: React.FC<entityDetails> = (entityDetails) => {
  return (
    <div className="each-entity-box">
      <div className="first-col">
        <div className="entity-logo">
          <img
            className="list-logo"
            //src={require(`../../assets/${entityDetails.logo}`)}
            src={`data:image/png;base64,${entityDetails.logo}`}
            alt=""
            //   width="50%"
            //   height="50%"
          />
        </div>
        <div className="entity-name content">{entityDetails.name}</div>
      </div>
      <Score score={entityDetails.totalEntityScore} />
      {/* <div
        className={[
          "entity-score",
          entityDetails.totalEntityScore >= 80
            ? "green-value"
            : 79 > entityDetails.totalEntityScore &&
              entityDetails.totalEntityScore > 60
            ? "orange-value"
            : "red-value",
        ].join(" ")}
      >
        {entityDetails.totalEntityScore ? entityDetails.totalEntityScore : 0}%
      </div> */}
    </div>
  );
};
export default EntityBox;
