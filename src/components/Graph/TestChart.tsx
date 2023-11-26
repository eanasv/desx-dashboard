import React, { useState } from "react";
import "./TestChart.css"; // Import your custom CSS for styling

const TestChart = () => {
  const [popoverData, setPopoverData] = useState(null);

  const handleClick = (event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    setPopoverData({
      x: rect.left + offsetX,
      y: rect.top + offsetY,
      item: item,
    });
  };

  return (
    <div className="popover-container">
      <div className="items">
        <div className="item" onClick={(e) => handleClick(e, "Item 1")}>
          Item 1
        </div>
        <div className="item" onClick={(e) => handleClick(e, "Item 2")}>
          Item 2
        </div>
        <div className="item" onClick={(e) => handleClick(e, "Item 3")}>
          Item 3
        </div>
      </div>
      {popoverData && (
        <div
          className="popover"
          style={{ left: popoverData.x, top: popoverData.y }}
        >
          {popoverData.item}
          <div className="popover-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default TestChart;
