import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimeHour from "./TimeHour";

const format = "MM/DD/YYYY";

export default function TimeMain() {
  const [dates, setDates] = useState([

  ]);
  const [showHours, setShowHours] = useState(false);

  const handleSelectTime= () => {
    if (dates.length > 0) {
      // navigate(`/TimeHour?dates=${JSON.stringify(dates)}`);
      dates.map((date) => {
      } )
      setShowHours(true);
    } else {
      setShowHours(false);
      alert("Please select some dates before proceeding to TimeHour.");
    }
  };

  const reselectDates = () => {
    setShowHours(false);
  }

  if (!showHours)
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
        <button onClick={handleSelectTime} className="bg-green-600" >Select hours</button>
      </div>
    );
  else
    return (
      <TimeHour dates={JSON.parse(JSON.stringify(dates))} reselectDates={reselectDates}/>
      );
}
