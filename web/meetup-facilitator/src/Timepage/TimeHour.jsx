import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TimeHour() {
  console.log("TimeHour rendered");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dates = JSON.parse(searchParams.get("dates"));

  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [formattedDates, setFormattedDates] = useState([]);
  const buttonWidth = `calc(${100 / dates.length}%)`;

  const hours = Array.from({ length: 16 }, (_, index) => 8 + index);

  const handleButtonClick = (date, hour) => {
    const buttonKey = `${date}-${hour}`;
    const newSelectedButtons = new Set(selectedButtons);

    if (newSelectedButtons.has(buttonKey)) {
      newSelectedButtons.delete(buttonKey);
    } else {
      newSelectedButtons.add(buttonKey);
    }

    setSelectedButtons(newSelectedButtons);
  };

  const groupButtonsByRow = () => {
    const groupedSelection = [];

    for (const button of selectedButtons) {
      const [date, hour] = button.split("-");
      const existingGroup = groupedSelection.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.hours.push(hour);
      } else {
        groupedSelection.push({ date, hours: [hour] });
      }
    }

    const formattedSelection = groupedSelection.map((group) => {
      return `${group.date} - ${group.hours.join(",")}`;
    });

    setFormattedDates(formattedSelection);
  };

  // Creating the grid with buttons for each hour
  const hourlyGrid = hours.map((hour) => {
    // Creating buttons for each date
    const buttons = dates.map((date) => {
      const isSelected = selectedButtons.has(`${date}-${hour}`);
      const buttonStyles = {
        background: isSelected ? "green" : "white",
        color: isSelected ? "white" : "black",
        height: "36px", // Adjust as needed
        width: buttonWidth,
        borderRadius: "0", // No rounded corners
      };

      return (
        <button
          key={`${date}-${hour}`}
          style={buttonStyles}
          onClick={() => handleButtonClick(date, hour)}
        >
          {hour}:00
        </button>
      );
    });

    // Wrapping buttons in a div for each hour
    return (
      <div key={`row-${hour}`} className="hourly-row">
        {buttons}
      </div>
    );
  });

  return (
    <div>
      <h1>TimeHour Page</h1>
      <div>
        <h2>Selected Dates:</h2>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
          <div className="hourly-grid flex">
            <div className="hour-label-column">
          {hours.map((hour) => (
          <div
            key={`label-${hour}`}
            className="hour-label h-9" 
          >
            {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
          </div>
          ))}
      </div>
          <div className="hourly-grid-item" style={{ display: 'block' }}>
        {hourlyGrid.map((item, index) => (
          <div key={`grid-item-${index}`}>
            {item}
          </div>
        ))}
      </div>
          </div>
      <button onClick={groupButtonsByRow}>Save</button>
      <div>
        <h2>Saved Selection:</h2>
        <ul>
          {formattedDates.map((formattedDate, index) => (
            <li key={index}>{formattedDate}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
