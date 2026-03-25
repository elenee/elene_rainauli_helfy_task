import React from "react";
import TaskForm from "./TaskForm";
import "../styles/ModalForm.css";

const EditModal = ({ task, handleUpdate, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>X</button>
        <TaskForm task={task} handleUpdate={handleUpdate} onClose={onClose} />
      </div>
    </div>
  );
};

export default EditModal;
