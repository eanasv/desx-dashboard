import React from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

import "./Subheader.css";

interface subHeaderProps {
  content?: any;
  pageHeadding?: any;
  showBreadcrumbs?: boolean;
  jobTree?: any;
  breadCrumbsDetails?: any;
}

export const SubHeader: React.FC<subHeaderProps> = ({
  content,
  pageHeadding,
  showBreadcrumbs,
  jobTree,
  breadCrumbsDetails,
}) => {
  return (
    <div className="subheader-container">
      {content ? (
        <div>{content}</div>
      ) : (
        <div className="subheader-pagename">{pageHeadding}</div>
      )}
      {showBreadcrumbs && (
        <div className="bread-container">
          <Breadcrumbs paths={breadCrumbsDetails} />
        </div>
      )}
      {jobTree && <>{jobTree}</>}
    </div>
  );
};
