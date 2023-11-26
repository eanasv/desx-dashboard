import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import DateInput from "../datePicker/DateInput";

interface DateRangeFilterProps {
  fetchChartData: any;
  fetchDates?: any;
  entityList?: any;
  selectedEntityList?: any;
}
export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  fetchChartData,
  fetchDates,
  entityList,
  selectedEntityList,
}) => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState(null);
  const [endCalendarVisible, setEndCalendarVisible] = useState(true);
  const [selectedEntities, setselectedEntities] = useState(selectedEntityList);
  const [allEntityList, setallEntityList] = useState(entityList);

  useEffect(() => {
    // const today = new Date();
    // const defaultEndDate = today.toISOString().slice(0, 10);
    // const oneYearAgo = new Date(
    //   today.getFullYear() - 1,
    //   today.getMonth(),
    //   today.getDate()
    // );
    // const defaultStartDate = oneYearAgo.toISOString().slice(0, 10);
    // setTimeout(() => {
    //   setStartDate(defaultStartDate);
    //   setEndDate(defaultEndDate);
    //   filterData(defaultStartDate, defaultEndDate);
    // }, 110);
    defaultFilterData();
  }, []); //companyAverageScore

  useEffect(() => {
    setallEntityList(allEntityList);
    setselectedEntities(selectedEntityList);
    filterData(startDate, endDate, selectedEntityList);
  }, [selectedEntityList]);

  const defaultFilterData = () => {
    const today = new Date();
    const defaultEndDate = today.toISOString().slice(0, 10);
    const oneYearAgo = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    const defaultStartDate = oneYearAgo.toISOString().slice(0, 10);
    setTimeout(() => {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      filterData(defaultStartDate, defaultEndDate);
    }, 110);
  };

  const filterData = async (
    startDateParam,
    endDateParam,
    selectedEntities?
  ) => {
    fetchDates(startDateParam, endDateParam);
    var entityLists = selectedEntities;
    if (!entityLists || entityLists?.length == 0) {
      entityLists = entityList?.map((item) => item.label);
    }

    if (startDateParam && endDateParam && entityList && entityList.length > 0) {
      const response = getHttp("skills/averageScoreOfListOfEntities", {
        startDate: startDateParam,
        endDate: endDateParam,
        entityNames: entityLists?.join(","),
      })
        .then((response) => {
          //console.log(response);

          fetchChartData(response);
          return { startDate, endDate }; // handle success
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    }
    return null;
  };

  function changeFilterStartDate(changeInStartDate) {
    setEndCalendarVisible(true);
    setStartDate(changeInStartDate);
    //setEndDate(changeInStartDate);
  }

  function changeFilterEndDate(changeInEndDate) {
    setEndDate(changeInEndDate);
  }

  return (
    <div className="date-range-filter-container">
      <div>
        <label className="calendar-heading">Start Date:</label>
        <DateInput
          maxDate={new Date().toISOString().substr(0, 10)}
          value={startDate}
          dateChangeEvent={changeFilterStartDate}
        />
      </div>
      {endCalendarVisible && (
        <div>
          <label className="calendar-heading">End Date:</label>
          <DateInput
            maxDate={new Date().toISOString().substr(0, 10)}
            value={endDate}
            dateChangeEvent={changeFilterEndDate}
            minDate={startDate}
          />
        </div>
      )}
      <button
        className="filter-button std  margin-left unwanted"
        onClick={() => filterData(startDate, endDate)}
        // onClick={filterData(startDate, endDate)}
      >
        Apply changes
      </button>

      <button
        className="filter-button std margin-left unwanted"
        onClick={() => defaultFilterData()}
        // onClick={filterData(startDate, endDate)}
      >
        Reset
      </button>
    </div>
  );
};
