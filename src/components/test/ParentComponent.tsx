import React, { useState } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";

function ParentComponent() {
  const [data, setData] = useState("");

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div>
      <Component1 onDataChanged={handleDataChange} />
      <Component2 data={data} />
    </div>
  );
}

export default ParentComponent;
