import React from "react";

function Table1() {
  return (
    <table>
      <thead>
        <tr>
          <th className="each-column-border">Header 1</th>
          <th className="each-column-border">Header 2</th>
          <th className="each-column-border">Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="each-column-border" rowSpan={parseInt("3")}>
            Merged Cell
          </td>
          <td className="each-column-border">Row 1, Column 2</td>
          <td className="each-column-border">Row 1, Column 3</td>
        </tr>
        <tr>
          <td className="each-column-border">Row 2, Column 2</td>
          <td className="each-column-border">Row 2, Column 3</td>
        </tr>
        <tr>
          <td className="each-column-border">Row 3, Column 2</td>
          <td className="each-column-border">Row 3, Column 3</td>
        </tr>
        <tr>
          <td className="each-column-border"></td>
          <td className="each-column-border"></td>
          <td className="each-column-border" rowSpan={parseInt("3")}>
            Merged Cell
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table1;
