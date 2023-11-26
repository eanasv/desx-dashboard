import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

interface DateInputProps {
  minDate?: any;
  maxDate?: any;
  value;
  dateChangeEvent: any;
}

const DateInput: React.FC<DateInputProps> = ({
  minDate,
  maxDate,
  value,
  dateChangeEvent,
}) => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState(null);
  const [endCalendarVisible, setEndCalendarVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const defaultStartDate = today.toISOString().slice(0, 10);
    setStartDate(defaultStartDate);
  }, []);

  const handleStartChange = (date) => {
    setStartDate(date);
    setEndCalendarVisible(true);
  };

  const handleDateChange = (date) => {
    setEndDate(date);
    dateChangeEvent(date);
  };

  return (
    <div className="date-input margin">
      <input
        type="date"
        className="input-field"
        value={value}
        //value={new Date().toISOString().substr(0, 10)}
        onChange={(event) => {
          handleDateChange(event.target.value);
        }}
        max={maxDate}
        min={minDate}
      />
    </div>
  );
};

export default DateInput;
