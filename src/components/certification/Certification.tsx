import React from "react";

export const Certification = ({ data }) => {
  return (
    <div>
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr className="each-column-border table-heading">
              <th className="each-column-border right-white-border">
                Certification name
              </th>
              <th className="each-column-border right-white-border">Date</th>
              <th className="each-column-border right-white-border">
                Location
              </th>
              <th className="each-column-border right-white-border">
                Year Verified
              </th>
              <th className="each-column-border right-white-border">
                Certifying body
              </th>
              {/* <th className="each-column-border ">Trainer profile</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                // className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td className="each-column-border capitalise">
                  {item.certificationName}
                </td>
                <td className="each-column-border capitalise">{item.date}</td>
                <td className="each-column-border capitalise">
                  {item.location}
                </td>
                <td className="each-column-border capitalise">
                  {item.yearCertified}
                </td>
                <td className="each-column-border capitalise">
                  {item.certifyingBody}
                </td>
                {/* <td className="each-column-border capitalise">
                  {item.trainerProfile}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
