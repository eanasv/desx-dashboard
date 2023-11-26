import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { EntityList } from "../../entityList/EntityList";
import "../Tabs.css";

export const Tab2 = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleEntityClick = (name, value, image) => {
    setSelectedEntity({ name: name, scoreValue: value, logo: image });
    //console.log(value);
  };

  const backButtonClicked = () => {
    setSelectedEntity(null);
  };
  if (selectedEntity) {
    return (
      // <EntityDetails
      //   entity={selectedEntity}
      //   backButtonClicked={backButtonClicked}
      // />
      <div>s</div>
    );
  } else {
    return <EntityList onEntityClick={handleEntityClick} />;
  }
};
