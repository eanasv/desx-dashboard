import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobChart from "../../../components/Graph/jobChart/JobChart";
import TestChart from "../../../components/Graph/TestChart";
import { MainChartSection } from "../../../components/mainChartSection/MainChartSection";
import { LoadingSpinner } from "../../../components/spinner/LoadingSpinner";
import ParentComponent from "../../../components/test/ParentComponent";
//import ReactLogo from "../assets/compass.svg";

function Home() {
  const [displayDataSet, setdisplayDataSet] = useState([]);
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  const changeDisplaySetData = (data) => {
    setdisplayDataSet(data);
  };

  return (
    <div>
      {/* <FilterSection onSelectedValueChange={changeDisplaySetData} /> */}
      {/* <Table data={displayDataSet} /> */}
      {/* <GraphDashboard /> */}
      {/* <HalfDonutChart1 /> */}
      <MainChartSection />
    </div>
  );
}
export default Home;
