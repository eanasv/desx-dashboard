import React, { useState } from "react";

function Component1(props) {
  const [newData, setNewData] = useState("");
  //console.log(props);
  const handleChange = (event) => {
    setNewData(event.target.value);
    props.onDataChanged(event.target.value);
  };

  return (
    <div>
      <input type="text" value={newData} onChange={handleChange} />
    </div>
  );
}

export default Component1;
