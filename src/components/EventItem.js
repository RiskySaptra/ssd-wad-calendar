"use client";
import { IoTrashOutline, IoPencil } from "react-icons/io5";

const EventItem = ({
  event,
  onCLose,
  openEdit,
  onDelete,
  parentIndex,
  setParentIndex,
  setChildIndex,
}) => {
  return (
    <>
      {event.length > 0 &&
        event.map((ev, index) => (
          <div
            key={index}
            style={{ backgroundColor: ev.eventColor }}
            className={`p-1 text-[10px] mb-1 text-white rounded-sm relative`}
          >
            <p>{ev.eventName}</p>
            <p>{ev.eventUser}</p>
            <p>{ev.eventTime}</p>
            <div className="absolute top-[5px] right-[5px] grid gap-1 grid-flow-col text-sm">
              <button
                onClick={() => {
                  onDelete(parentIndex, index);
                  onCLose();
                }}
                className="hover:text-red-500"
              >
                <IoTrashOutline />
              </button>

              <button
                onClick={() => {
                  openEdit(ev);
                  setParentIndex(parentIndex);
                  setChildIndex(index);
                }}
                className="hover:text-blue-500"
              >
                <IoPencil />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default EventItem;
