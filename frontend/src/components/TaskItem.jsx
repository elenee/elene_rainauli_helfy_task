import React from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onDelete, onToggle, onUpdate }) => {
  return (
    <div className="task-item">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p className={`priority priority-${task.priority}`}>{task.priority}</p>
      <p>{task.completed ? "completed" : "pending"}</p>
      <p>{new Date(task.createdAt).toLocaleDateString()}</p>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark Incomplete" : "Mark Completed"}
      </button>
      <button onClick={() => onUpdate(task)}>Update</button>
      <button
        onClick={() => {
          if (window.confirm("Delete this task?")) onDelete(task.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
