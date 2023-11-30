import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimeHour from "./TimeHour";

const format = "YYYY-MM-DD";

export default function TimeMain() {
  const [dates, setDates] = useState([

  ]);
  const [showHours, setShowHours] = useState(false);

  const handleSelectTime= () => {
    if (dates.length > 0) {
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
      <div className="flex items-center flex-col h-screen p-8">
      <h1 className="mb-4 py-4">Time</h1>
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
        <div className = "py-4">
          <ul>
            {dates.map((date, index) => (
              <li key={index}>{date.format()}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleSelectTime} className=" bg-green-800 text-white py-2 px-4 rounded-md" >Select Hours</button>
      </div>
    );
  else
    return (
      <TimeHour dates={dates.map((date) => date.format())} reselectDates={reselectDates}/>
      );
}
