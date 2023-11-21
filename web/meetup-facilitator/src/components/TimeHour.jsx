import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { preferencesContext } from "../pages/Preferences";

export default function TimeHour({dates}) {
  const prefsContext = useContext(preferencesContext);
  const location = useLocation();
  const navigate = useNavigate(); 


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
            onClick={() =>  handleButtonClick(date, hour)}
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
    prefsContext.updateTimePrefs(formattedSelection);
  };

  const handleJumpToLocationPage = () => {
    // Use the navigate function to go to the LocationPage
    navigate("/LocationPage");                                                                                                              
  };

  return (
    <div>
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
          ))}
        </ul>
      </div>
    </div>
  );
}
