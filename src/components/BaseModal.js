import React, { useEffect, useRef } from "react";

const BaseModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "visible";
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="modal-background"
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } z-50 overflow-auto bg-black bg-opacity-50`}
    >
      <div
        ref={modalRef}
        className="relative m-auto mt-[10%] w-full max-w-[500px] p-4"
      >
        <div className="rounded-lg bg-white shadow-lg">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
