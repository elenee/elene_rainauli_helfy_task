import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate, onToggle, isLoading }) => {
  const [shouldCarousel, setShouldCarousel] = useState(false);

  useEffect(() => {
    const totalWidth = tasks.length * 320;
    setShouldCarousel(totalWidth > window.innerWidth);
  }, [tasks]);

  if (isLoading) return <p>Loading ...</p>;
  if (tasks.length === 0) return <p>no tasks yet</p>;

  const displayTasks = shouldCarousel ? [...tasks, ...tasks] : tasks;

  return (
    <div className="carousel-wrapper">
      <div className={`task-list ${shouldCarousel ? "carousel-active" : ""}`}>
        {displayTasks.map((task, index) => (
          <TaskItem
            key={`${task.id}-${index}`}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
