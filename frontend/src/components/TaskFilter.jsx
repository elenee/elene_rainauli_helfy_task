import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">all</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
  );
};

export default TaskFilter;
