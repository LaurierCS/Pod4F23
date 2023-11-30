import { useEffect, useState, useContext } from "react";
import { preferencesContext } from "../pages/Preferences";
import Button from "./Button";

export default function TimeHour({dates, reselectDates}) {
  const prefsContext = useContext(preferencesContext);


  const [hourlyGrid, setHourlyGrid] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [formattedDates, setFormattedDates] = useState({});

  useEffect(() => {
    const hours = Array.from({ length: 16 }, (_, index) => 8 + index);
    const grid = hours.map((hour) => {
      return dates.map((date) => {
        const isSelected = selectedButtons.has(`${date}_${hour}`);
        const buttonStyle = isSelected ? { background: "green" } : {};
        return (
          <button
            key={`${date}_${hour}`}
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
    const buttonKey = `${date}_${hour}`;
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
      const [date, hour] = button.split("_");
      const existingGroup = groupedSelection.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.hours.push(hour);
      } else {
        groupedSelection.push({ date, hours: [hour] });
      }
    }

    const formattedSelection = {};
    for (const group of groupedSelection) {
      const { date, hours } = group;
      const formattedHours = hours.map((hour) => `${hour}:00`);
      formattedSelection[date] = formattedHours;
    }

    setFormattedDates(formattedSelection);
    prefsContext.updateTimePrefs(formattedSelection);
  };


  return (
    <div>
      <Button click={reselectDates} text="Reselect dates" classList="fixed text-xs bottom-4 left-4 bg-green-800 text-white py-2 px-4 rounded-md"/>
      <div>
      <div className="flex flex-col items-center">
        <br></br>
  <h2 className="text-2xl mb-2">Selected Dates:</h2>
  <ul className="flex list-none py-4">
    {dates.map((date, index) => (
      <li key={index} className="mr-2">{date}</li>
    ))}
  </ul>
  <br></br>
</div>
      </div>
      <div className="hourly-grid">
        {hourlyGrid.map((row, index) => (
          <div key={index} className="hourly-row">
            {row}
          </div>
        ))}
      </div>

      <button onClick={groupButtonsByRow} className="fixed bottom-4 right-4 bg-green-800 text-white py-2 px-4 rounded-md">Save</button>
      <div className="mt-3 mb-3">
        <ul>
          {Object.keys(formattedDates).map((key, index) => (
            <li key={index}>{key}: {formattedDates[key].reduce((prev, curr) => `${prev}, ${curr}`)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
