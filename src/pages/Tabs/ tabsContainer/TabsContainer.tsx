import React, { useState } from "react";

import Tab1 from "../tab1/Tab1";
import { Tab2 } from "../tab2/Tab2";
import Tab3 from "../tab3/Tab3";
import Tab4 from "../tab4/Tab4";
import "../Tabs.css";

export const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    {
      id: 1,
      tabTitle: "Tab 1",
      title: "Entities Index",
      content: <Tab2 />,
    },
    {
      id: 2,
      tabTitle: "Tab 2",
      title: "Workforce index",
      content: <Tab1 />,
      //path: "/tab2/entity-list",
      // content: (
      //   <div>

      //   </div>
      // ),
    },
    {
      id: 3,
      tabTitle: "Tab 3",
      title: "Digital skills historical scoring",
      content: <Tab3 />,
    },
    // {
    //   id: 4,
    //   tabTitle: "Tab 4",
    //   title: "Training Needs",
    //   content: <Tab4 />,
    // },
  ];

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tab-button-container">
        {tabs?.map((tab, i) => (
          <div
            // disabled={activeTab === `${tab.id}`}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={[
              "tab-button",
              "tab",
              tab.id === activeTab ? "active-tab" : "",
            ].join(" ")}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div>
        {tabs?.map((tab) =>
          tab.id === activeTab ? <p key={tab.id}>{tab.content}</p> : null
        )}
      </div>
    </div>
  );
};
