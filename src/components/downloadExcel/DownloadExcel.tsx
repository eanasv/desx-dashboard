import React from "react";

export const DownloadExcel = () => {
  const downloadSampleExcel = (fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/" + fileName + ".xlsx"; //`{/${fileName}.xlsx}`; //"/sample.xlsx"; // Path to your Excel sheet
    downloadLink.download = fileName + ".xlsx"; //`{${fileName}.xlsx}`; //"sample.xlsx"; // Desired download file name
    downloadLink.click();
  };

  return (
    <div className="download-excel">
      <div>
        <div>Sample Excel Download</div>
        <div className="download-buttons">
          {" "}
          <button
            onClick={() => downloadSampleExcel("Employee")}
            className="btn1"
          >
            Sample file
          </button>
          {/* <button onClick={() => downloadSampleExcel("Training")}>
            Training
          </button> */}
        </div>
      </div>
    </div>
  );
};
