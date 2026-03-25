import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate, onToggle, isLoading }) => {
  if (isLoading) return <p>Loading ...</p>;
  if (tasks.length === 0) return <p>no tasks yet</p>;
  const duplicatedTasks = [...tasks, ...tasks];
  return (
    <div className="task-list">
      {duplicatedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
