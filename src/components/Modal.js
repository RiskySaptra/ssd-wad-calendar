import BaseModal from "@components/BaseModal";
import { IoCloseOutline } from "react-icons/io5";

const Modal = (props) => {
  return (
    <BaseModal {...props}>
      <div className="rounded-lg bg-white shadow-lg">
        <div className="flex justify-between p-4">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <button
            onClick={props.onClose}
            className="text-[20px] text-gray-600 hover:text-gray-800"
          >
            <IoCloseOutline />
          </button>
        </div>
        <div className="p-4 pt-0">{props.children}</div>
      </div>
    </BaseModal>
  );
};

export default Modal;
