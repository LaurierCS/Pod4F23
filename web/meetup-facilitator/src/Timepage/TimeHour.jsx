import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TimeHour() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dates = JSON.parse(searchParams.get("dates"));

  const [hourlyGrid, setHourlyGrid] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [formattedDates, setFormattedDates] = useState([]);

  useEffect(() => {
    const hours = Array.from({ length: 16 }, (_, index) => 8 + index);
    const grid = hours.map((hour) => {
      return dates.map((date) => {
        const isSelected = selectedButtons.has(`${date}-${hour}`);
        const buttonStyle = isSelected ? { background: "green" } : {};
        return (
          <button
            key={`${date}-${hour}`}
            style={buttonStyle}
            onClick={() => handleButtonClick(date, hour)}
          >
            {hour}:00
          </button>
        );
      });
    });

    setHourlyGrid(grid);
  }, [dates, selectedButtons]);

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
      <div className="hourly-grid">
        {hourlyGrid.map((row, index) => (
          <div key={index} className="hourly-row">
            {row}
          </div>
        ))}
      </div>
      <button onClick={groupButtonsByRow}>Save</button>
      <div>
        <h2>Saved Selection:</h2>
        <ul>
          {formattedDates.map((formattedDate, index) => (
            <li key={index}>{formattedDate}</li>
           ) )}
        </ul>
      </div>
    </div>
  );
}
