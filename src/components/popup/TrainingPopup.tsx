import React from "react";
import "./PopupModal.css";

const TrainingPopup = (props) => {
  return (
    <div className="popup-overlay" onClick={props.closeModal}>
      <div className="modal">
        <button className="close" onClick={props.closeModal}>
          &times;
        </button>
        <div className="header"> {props.employeDetails.name} </div>

        <div className="popup-skill-container">
          <div className="skill-full-width">
            <div className="skill-items">
              <div className="first-item skill-heading">Course</div>
              <div className="skill-item-container">
                {props.course.length > 0 &&
                  props.course?.map((item, index) => (
                    <div className="items" key={index}>
                      <div
                      // className={
                      //   item.enrollmentStatus == "enrolled"
                      //     ? "green skill-first-item"
                      //     : "red skill-first-item"
                      // }
                      >
                        {item.name} - {item.enrollmentDate}{" "}
                        {item.enrollmentStatus}
                      </div>
                    </div>
                  ))}
                {props.course.length == 0 && <div>No items to display</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPopup;
