import React, { useEffect, useRef } from "react";
import "./Popover.css";

interface PopoverInterface {
  tablePopupData: any;
  popoverPosition?: any;
  onClose: any;
}

export const Popover: React.FC<PopoverInterface> = ({
  tablePopupData,
  popoverPosition,
  onClose,
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      onClose();
      if (popoverRef.current) {
        //console.log("clicked outside"); //&& !popoverRef.current.contains(event.target)
        onClose(); // Close the tooltip when clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const popoverStyle: any = {
    position: "absolute",
    left: `${popoverPosition?.x}px`,
    top: `${popoverPosition.y}px`,
    // Additional styling as needed
  };

  return (
    <div className="popover-container" style={popoverStyle}>
      {tablePopupData?.map((data, index) => (
        <p key={index} className="popover-content">
          <div className="employee-details">{data.name}</div> - {data.job}
        </p>
      ))}
      <div className="popover-arrow"></div>
    </div>
  );
};
