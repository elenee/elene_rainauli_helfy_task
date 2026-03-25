import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import taskService from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import EditModal from "./components/EditModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <div className="filter-container">
          <TaskFilter filter={filter} setFilter={setFilter} />
        </div>
      </header>
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
        <section className="form-view">
          <div className="form-card">
            <h2>Create New Task</h2>
            <TaskForm handleAdd={handleAddTask} />
          </div>
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
