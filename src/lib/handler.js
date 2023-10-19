import Cookies from "js-cookie";

export const updateData = (newData) => {
  const data = JSON.stringify(newData);
  return Cookies.set("data", data);
};

export const getData = () => {
  const dataString = Cookies.get("data") || "{}";
  const parsedData = JSON.parse(dataString);

  return parsedData;
};
