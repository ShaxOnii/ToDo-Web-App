import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
