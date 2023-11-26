import React, { useEffect, useState } from "react";
import "./Table.css";

interface tableInterface {
  data: any;
}
const Table: React.FC<tableInterface> = (props) => {
  const [tableData, setTableData] = useState(props.data);
  const [columnHeadingNameSet, setColumnHeadingNameSet] = useState<string[]>(
    []
  );

  useEffect(() => {
    setTableData(props.data);
    getColumnHeading(props.data);
  }, [props.data]);

  const getColumnHeading = (tableData) => {
    const newColumnHeadingNameSet = [];

    for (const key in tableData[0]) {
      newColumnHeadingNameSet.push(key);
    }

    setColumnHeadingNameSet(newColumnHeadingNameSet);
  };

  return (
    tableData.length > 0 && (
      <table className="table">
        <thead>
          <tr>
            {columnHeadingNameSet?.map((item, index) => (
              <th key={index} className="each-column-border">
                {item.replace(/_/g, "  ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr
              key={index}
              // className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              {columnHeadingNameSet?.map((heading, number) => (
                <td key={number} className="each-column-border">
                  {item[heading]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
export default Table;
