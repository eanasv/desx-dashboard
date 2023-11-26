import React from "react";
import Modal from "react-modal";
import "./Popup.css"; // Import your CSS file for styling

const Popup = ({ isOpen, onRequestClose, onConfirm, bodyContent }) => {
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="custom-modal"
        overlayClassName="custom-overlay overlay"
      >
        <div className="modal-heading">Certification details</div>
        <div className="modal-body">
          <div>{bodyContent}</div>
          <div>
            <button className="modal-button" onClick={onRequestClose}>
              Cancel
            </button>
            <button className="modal-button" onClick={onConfirm}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
