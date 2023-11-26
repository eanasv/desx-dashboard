import axios from "axios";
import React, { useState } from "react";
import { DownloadExcel } from "../../components/downloadExcel/DownloadExcel";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import DropDown from "../../components/dropDown/DropDown";
import { SubHeader } from "../../components/subHeader/SubHeader";
import { postHttp } from "../../service/APIRequest";
import { excelUpload } from "../../service/Config";
import "./FileUpload.css";
import Store from "../../redux/Store";
import { showErrorMesaage } from "../../redux/features/errorSlice";

const FileUpload = () => {
  // const [file, setFile] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedFileType, setSelectedFileType] = useState("");

  // const handleItemSelect = (event) => {
  //   console.log(event);
  //   setSelectedFile(event.target.files[0]);
  //   setSelectedFileType(event.target.value);
  // };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleResponseText = () => {
  //   setresponseText(null);
  // };

  var typeOfDropdown = [
    { id: 1, label: "Employee", value: "Employee" },
    { id: 2, label: "Training", value: "Training" },
    { id: 3, label: "Certification and other", value: "certifcate" },
    // { id: 3, label: "Entity", value: "Entity" },
  ];
  const [responseText, setresponseText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event);
  };

  // const resetResponseText = () => {
  //   setTimeout(() => {
  //     setresponseText("");
  //   }, 10000);
  // };

  const handleSubmit = async () => {
    const entityName = userDetailsObj.entity;
    console.log(userDetailsObj.entity);

    let endpoint;

    if (!selectedOption) {
      Store.dispatch(
        showErrorMesaage("Please select an option from the dropdown")
      );
      return;
    } else if (!selectedFile) {
      Store.dispatch(showErrorMesaage("Please select one file to upload"));
      return;
    }
    var uploadType;
    if (selectedOption.value == "Employee") {
      endpoint = excelUpload + "upload";
    } else if (selectedOption.value == "Training") {
      endpoint = excelUpload + "trainingNeedsUpload";
    } else if (selectedOption.value == "certifcate") {
      endpoint = excelUpload + "personal-details";
    }
    if (entityName) {
      endpoint = `${endpoint}?entityName=${entityName}`;
      console.log(endpoint);
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("option", selectedOption.value);
    setresponseText("");
    postHttp(endpoint, formData, true)
      .then((response) => {
        // console.log(response);
        if (response) {
          // setresponseText(response?.message);
          Store.dispatch(showErrorMesaage(response.data));
        }
        setSelectedFile(null);
        setSelectedOption(null);
        clearFileInput();
      })
      .catch((error) => {
        console.log(error);
        Store.dispatch(showErrorMesaage(error?.error));
        //setresponseText(error);
        clearFileInput();
        // handle error
      });
  };

  const clearFileInput = () => {
    //resetResponseText();
    const inputElement = document.getElementById("file") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ""; // Clear the input value
    }
  };
  var userDeatils = JSON.parse(sessionStorage.getItem("userDetails"));

  return (
    <div className="upload-container ">
      <div className="content">
        <SubHeader
          pageHeadding={`File Upload ${userDeatils.entity}`}
          showBreadcrumbs={true}
        />
        <div className="upload-area">
          <DropDown
            mainList={typeOfDropdown}
            name=""
            onChangeDropDownItem={handleOptionChange}
            isMulti={false}
            classname="flex"
            placeholder={"Select an option"}
            value={selectedOption}
          />
          <div className="file-browser">
            <label htmlFor="file">Select a file:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".xls, .xlsx"
            />
          </div>
          <button
            className="filter-button std unwanted text upload-button"
            onClick={handleSubmit}
          >
            Upload
          </button>
          {/* <div className="response-text">{responseText}</div> */}
        </div>
        <ErrorComponent />
      </div>
      <DownloadExcel />
    </div>
  );
};

export default FileUpload;
