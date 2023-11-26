import React, { useEffect, useState } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import "./App.css";
import { LoadingSpinner } from "./components/spinner/LoadingSpinner";
import { TabsContainer } from "./pages/Tabs/ tabsContainer/TabsContainer";
import Tab1 from "./pages/Tabs/tab1/Tab1";

import { useSelector } from "react-redux";
import FileUpload from "./pages/dataFileUpload/FileUpload";
import { Header } from "./components/header/Header";
import { EntityList } from "./pages/entityList/EntityList";
import { EntityDetails } from "./pages/entityDetails/EntityDetails";
import CategoryList from "./pages/categoryList/CategoryList";
import SlidingMenu from "./components/slidingMenu/SlidingMenu";
import CategoryDetails from "./pages/categoryDetails/CategoryDetails";
import Tab3 from "./pages/Tabs/tab3/Tab3";
import Login from "./pages/login/Login";
import { UserCreation } from "./pages/createUser/UserCreation";
import { Todelete } from "./pages/entityDetails/Todelete";
import { MultiStepForm } from "./pages/MultiStepForm/MultiStepForm";

function App() {
  const isLoadingVar = useSelector((state: any) => state.loader.isLoading);
  const [isLoading, setisLoading] = useState(isLoadingVar);
  const history = useHistory();

  //const isLoading = useSelector((state: any) => state.loader.isLoading);
  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString); //userDetailsObj.entity

  useEffect(() => {
    setisLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="App">
      <Router>
        {" "}
        <Header />
        {useSelector((state: any) => state.loader.isLoading) ? (
          <LoadingSpinner />
        ) : (
          <></>
        )}
        <Switch>
          {/* <Route exact path="/" component={TabsContainer} /> */}
          <Route exact path="/" component={EntityList} />
          {/* {userDetailsObj == null && ( */}
          <Route exact path="/login" component={Login} />
          {/* )} */}
          <Route
            exact
            path="/entitiesIndex/:entityName"
            component={EntityDetails}
          />
          {userDetailsObj == null && <Redirect to="/login" />}
          <Route path="/upload" component={FileUpload} />
          <Route exact path="/Home" component={EntityList}>
            <Redirect to="/" />
          </Route>
          <Route exact path="/entitiesIndex" component={EntityList}>
            <Redirect to="/" />
          </Route>
          <Route exact path="/workforceIndex" component={CategoryList} />
          <Route exact path="/addUser" component={UserCreation} />
          <Route
            exact
            path="/entitiesIndex/:entityName/other"
            component={Todelete}
          />
          <Route exact path="/addProfile" component={MultiStepForm} />
          <Route
            exact
            path="/workforceIndex/:categoryName"
            component={CategoryDetails}
          />
          <Route exact path="/:tab3Name" component={Tab3} />
        </Switch>
        {userDetailsObj != null && <SlidingMenu />}
      </Router>
    </div>
  );
}

export default App;
