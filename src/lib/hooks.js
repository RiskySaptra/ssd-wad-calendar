import { useEffect, useState } from "react";
import {
  formatDate,
  getDaysInMonth,
  getRandomLightHexColor,
  updateDataCookies,
} from "./utils";


export const useGetDaysInMonth = () => {
  const todayISOString = formatDate(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [parentIndex, setParentIndex] = useState(null);
  const [childIndex, setChildIndex] = useState(null);

  useEffect(() => {
    setDaysInMonth(getDaysInMonth());
    setIsLoading(false);
  }, []);

  const onCreate = (data) => {
    const updatedData = [...daysInMonth];
    updatedData[parentIndex].event.push(data);
    setDaysInMonth(updatedData);

    updatedData[parentIndex].day;
    updateDataCookies(
      updatedData[parentIndex].day,
      updatedData[parentIndex].event
    );
    setParentIndex(null);
  };

  const onEdit = (data) => {
    const updatedData = [...daysInMonth];
    updatedData[parentIndex].event[childIndex] = data;
    setDaysInMonth(updatedData);
    updateDataCookies(
      updatedData[parentIndex].day,
      updatedData[parentIndex].event
    );
    setParentIndex(null);
    setChildIndex(null);
  };

  const onDelete = (parent, child) => {
    const updatedData = [...daysInMonth];
    updatedData[parent].event.splice(child, 1);
    updateDataCookies(updatedData[parent].day, updatedData[parent].event);
    setDaysInMonth(updatedData);
  };

  return {
    todayISOString,
    isLoading,
    daysInMonth,
    setDaysInMonth,
    onCreate,
    onEdit,
    onDelete,
    setParentIndex,
    setChildIndex,
  };
};

export const useHandleCreateOrEdit = () => {
  const defaultData = {
    eventColor: getRandomLightHexColor(),
    eventName: "",
    eventUser: "",
    eventTime: "12:00 am",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [tempData, setTempData] = useState(defaultData);
  const [type, setType] = useState("create");

  const openCreate = () => {
    setType("create");
    setIsOpen(true);
    setTempData(defaultData);
  };

  const openEdit = (data) => {
    setType("edit");
    setIsOpen(true);
    setTempData(data);
  };

  const onCLose = () => {
    setIsOpen(false);
    setTempData(defaultData);
  };

  return {
    isOpen,
    tempData,
    type,

    setIsOpen,
    onCLose,
    openCreate,
    openEdit,
    setTempData,
  };
};
