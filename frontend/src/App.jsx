import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import taskService from "./services/taskService";
import TaskFilter from "./components/TaskFilter";
import EditModal from "./components/EditModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const allTasks = await taskService.getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.log("failed to fetch tasks", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (data) => {
    try {
      await taskService.addTask(data);
      fetchTasks();
    } catch (error) {
      console.log("failed to add task", error.message);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleUpdate = async (id, data) => {
    try {
      await taskService.updateTask(id, data);
      setIsEditing(false);
      fetchTasks();
      console.log("help");
    } catch (error) {
      console.log("failed to update task", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.log("failed to delete task", error.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await taskService.toggleStatus(id);
      await fetchTasks();
    } catch (error) {
      console.log("failed to change status task", error.message);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-wrapper">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      <div className="flex">
        <div>
          <TaskFilter filter={filter} setFilter={setFilter} />
        </div>
        <div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="addTask-button"
          >
            {isAdding ? "Cancel" : "Add Task"}
          </button>
          {isAdding && (
            <EditModal
              task={null}
              onClose={() => setIsAdding(false)}
              handleUpdate={handleUpdate}
              handleAdd={handleAddTask}
            />
          )}
        </div>
      </div>
      <main className="content-area">
        <section className="carousel-view">
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDelete}
            onUpdate={handleEditClick}
            onToggle={handleToggle}
            isLoading={loading}
          />
        </section>
        {isEditing && (
          <EditModal
            task={selectedTask}
            onClose={() => {
              setIsEditing(false);
              setSelectedTask(null);
            }}
            handleUpdate={handleUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
