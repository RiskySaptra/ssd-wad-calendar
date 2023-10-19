import { getData, updateData } from "./handler";

const today = new Date();

export const getRandomLightHexColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

export const parseTime = (timeString) => {
  if (!timeString) return { hour: "", minute: "", period: "" };
  const [time, period] = timeString.split(" ");
  const [hour, minute] = time.split(":");

  return {
    hour: Number(hour),
    minute: Number(minute),
    period: period.toLowerCase(),
  };
};

export function formatDate(date) {
  return date.toLocaleString().slice(0, 10);
}

export const updateDataCookies = (date, newData) => {
  const cookiesData = getData();

  cookiesData[formatDate(new Date(date))] = newData;
  updateData(cookiesData);
};

export const getDaysInMonth = () => {
  const firstDay = getFirstDayOfMonth();
  const lastDay = getLastDayOfMonth();
  const data = getData();

  const days = [];

  for (
    let day = new Date(firstDay);
    day <= lastDay;
    day.setDate(day.getDate() + 1)
  ) {
    const dateObject = { day: new Date(day), event: [] };
    const existingData = data[formatDate(new Date(day))];
    if (existingData) {
      dateObject.event.push(...existingData);
    }
    days.push(dateObject);
  }

  return days;
};

export const getTitle = () => {
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  return month + " " + year;
};

const getFirstDayOfMonth = () => {
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

const getLastDayOfMonth = () => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};
