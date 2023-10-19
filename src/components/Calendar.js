"use client";

import { formatDate, getTitle } from "../lib/utils";
import { useGetDaysInMonth, useHandleCreateOrEdit } from "../lib/hooks";

import { IoAdd } from "react-icons/io5";
import EventItem from "./EventItem";
import CreateOrEditEvent from "./CreateOrEditEvent";

const Calendar = () => {
  const handleCreateOrEdit = useHandleCreateOrEdit();
  const daysInMonthHooks = useGetDaysInMonth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{getTitle()}</h1>
      <CreateOrEditEvent {...handleCreateOrEdit} {...daysInMonthHooks} />
      <div className="grid grid-cols-7 gap-1 bg-gray-700 p-2   rounded-[10px]">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div key={day} className="text-center font-semibold text-white mb-3">
            {day}
          </div>
        ))}

        {!daysInMonthHooks.isLoading &&
          daysInMonthHooks.daysInMonth.map((item, index) => {
            const isToday =
              daysInMonthHooks.todayISOString === formatDate(item.day);
            return (
              <div
                key={item.day.getDate()}
                className="min-h-[250px] p-2 rounded-[5px] bg-white "
              >
                <div className="flex justify-between items-center mb-2">
                  <div
                    className={`${
                      isToday && "border-blue-500 border-[2px]"
                    } rounded-full w-[25px] h-[25px] text-center text-[13px] flex justify-center items-center`}
                  >
                    <p>{item.day.getDate()}</p>
                  </div>

                  {item.event.length <= 2 && (
                    <button
                      onClick={() => {
                        handleCreateOrEdit.openCreate();
                        daysInMonthHooks.setParentIndex(index);
                      }}
                      className="bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center"
                    >
                      <IoAdd />
                    </button>
                  )}
                </div>

                <EventItem
                  parentIndex={index}
                  {...item}
                  {...handleCreateOrEdit}
                  {...daysInMonthHooks}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;
