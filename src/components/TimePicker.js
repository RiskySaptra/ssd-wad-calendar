import { useState } from "react";
import { parseTime } from "@lib/utils";

const TimePicker = ({ onTimeChange, label, value }) => {
  const { hour = "", minute = "", period = "" } = parseTime(value);
  const [selectedHour, setSelectedHour] = useState(hour || "00");
  const [selectedMinute, setSelectedMinute] = useState(minute || "00");
  const [selectedPeriod, setSelectedPeriod] = useState(period || "AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 4 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  );
  const periods = ["am", "pm"];

  const handleHourChange = (event) => {
    const newHour = event.target.value;
    setSelectedHour(newHour);
    onTimeChange(`${newHour}:${selectedMinute} ${selectedPeriod}`);
  };

  const handleMinuteChange = (event) => {
    const newMinute = event.target.value;
    setSelectedMinute(newMinute);
    onTimeChange(`${selectedHour}:${newMinute} ${selectedPeriod}`);
  };

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    onTimeChange(`${selectedHour}:${selectedMinute} ${newPeriod}`);
  };

  return (
    <div className="mb-2">
      <label className="mb-1 block text-sm font-[500] leading-[21px] text-[#222222]">
        {label}
      </label>
      <div className="flex rounded border-gray-400 border-[1.5px] p-1 focus-within:border-blue-500">
        <select
          id="hourPicker"
          name="hourPicker"
          defaultValue={selectedHour}
          onChange={handleHourChange}
          className="form-select block w-full pl-3 pr-10 py-1 text-base leading-5 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          id="minutePicker"
          name="minutePicker"
          defaultValue={selectedMinute}
          onChange={handleMinuteChange}
          className="form-select block w-full pl-3 pr-10 py-1 text-base leading-5 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <select
          id="periodPicker"
          name="periodPicker"
          defaultValue={selectedPeriod}
          onChange={handlePeriodChange}
          className="form-select block w-full pl-3 pr-10 py-1 text-base leading-5 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
        >
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
