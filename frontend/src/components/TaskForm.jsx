import React, { useEffect, useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ task, handleAdd, handleUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = { title: "", description: "", priority: "" };

    try {
      if (!formData.title.trim()) errors.title = "title is required";
      if (!formData.description.trim())
        errors.description = "description is required";
      if (!formData.priority) errors.priority = "priority is required";

      if (Object.values(errors).some((e) => e)) {
        setError(errors);
        return;
      }

      if (task) {
        await handleUpdate(task.id, formData);
        if (onClose) onClose();
      } else {
        await handleAdd(formData);
        setFormData({
          title: "",
          description: "",
          priority: "",
        });
        if (onClose) onClose();
      }

      setError({
        title: "",
        description: "",
        priority: "",
      });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="">Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {error.title && <p className="error">{error.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="">Description:</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {error.description && <p className="error">{error.description}</p>}
      </div>

      <div className="form-group">
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {error.priority && <p className="error">{error.priority}</p>}
      </div>
      <button>Save</button>
    </form>
  );
};

export default TaskForm;
