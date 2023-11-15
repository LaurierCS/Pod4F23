import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker, { DateObject } from "react-multi-date-picker";

const format = "MM/DD/YYYY";

export default function TimeMain() {
  const navigate = useNavigate();
  const [dates, setDates] = useState([

  ]);

  const handleGoToTimeHour = () => {
    if (dates.length > 0) {
      navigate(`/TimeHour?dates=${JSON.stringify(dates)}`);
    } else {
      alert("Please select some dates before proceeding to TimeHour.");
    }
  };

  return (
    <div className="App">
      <h1>Main Time Page</h1>
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
      <button onClick={handleGoToTimeHour}>Go to TimeHour</button>
    </div>
  );
}
