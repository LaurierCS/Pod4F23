import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimeHour from "./TimeHour";

const format = "MM/DD/YYYY";

export default function TimeMain() {
  const navigate = useNavigate();
  const [dates, setDates] = useState([

  ]);
  const [showHours, setShowHours] = useState(false);

  const handleSelectTime= () => {
    if (dates.length > 0) {
      // navigate(`/TimeHour?dates=${JSON.stringify(dates)}`);
      dates.map((date) => {
        console.log(typeof date, date.format());
      } )
      setShowHours(true);
    } else {
      setShowHours(false);
      alert("Please select some dates before proceeding to TimeHour.");
    }
  };

  return (
    <div className="App">
      <h1>Time</h1>
      <div style={{ textAlign: "center" }}>
        <DatePicker
          value={dates}
          onChange={setDates}
          multiple
          sort
          format={format}
          calendarPosition="bottom-center"
        />
      </div>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.format()}</li>
        ))}
      </ul>
      {!showHours && <button onClick={handleSelectTime}>Select hours</button>}
      {showHours && <TimeHour dates={JSON.parse(JSON.stringify(dates))}/>}
    </div>
  );
}
