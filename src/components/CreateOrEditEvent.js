import Modal from "./Modal";
import Input from "@components/Input";
import TimePicker from "@components/TimePicker";
import { useState } from "react";

const validateEmail = (email) => {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailPattern.test(email);
};

const CreateOrEditEvent = ({
  isOpen,
  onCLose,
  tempData,
  setTempData,
  onCreate,
  onEdit,
  type,
}) => {
  const [error, setError] = useState("");
  const onTimeChange = (value) => {
    setTempData({ ...tempData, eventTime: value });
  };

  const onChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCLose}
      title={type === "create" ? "Add Event" : "Edit Event"}
    >
      <Input
        value={tempData.eventName}
        name="eventName"
        label={"Event Name"}
        onChange={onChange}
      />
      <Input
        value={tempData.eventUser}
        name="eventUser"
        label={"Invited User"}
        onChange={onChange}
      />
      <TimePicker
        value={tempData.eventTime}
        label="Event Time"
        onTimeChange={onTimeChange}
      />
      <p className="text-red-500">{error}</p>
      <div className="pt-3 flex justify-end gap-2">
        <button
          onClick={() => {
            console.log();
            if (!tempData.eventName) {
              setError("Please fill Event Name");
              return;
            }
            if (!tempData.eventUser) {
              setError("Please fill Invited User");
              return;
            }

            if (!validateEmail(tempData.eventUser)) {
              setError("Please enter valid Invited User email");
              return;
            }

            if (type === "create") {
              onCreate(tempData);
            } else {
              onEdit(tempData);
            }

            onCLose();
          }}
          className="bg-blue-500 py-1 px-3 rounded-sm text-white"
        >
          Save
        </button>
        <button
          onClick={onCLose}
          className="bg-yellow-500 py-1 px-3 rounded-sm text-white"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CreateOrEditEvent;
