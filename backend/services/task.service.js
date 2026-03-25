let tasks = [];

const getAllTasks = (req, res) => {
  return res.status(200).json(tasks);
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) return res.status(404).json({ message: "invalid id", data: null });
  return res.status(200).json(task);
};

const addtask = (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description || !priority) {
    return res
      .status(400)
      .json({ message: "title, description and priority are required fields" });
  }

  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    return res
      .status(400)
      .json("priority should only be any of these: low, medium, high");
  }

  const lastIndex = tasks[tasks.length - 1]?.id || 0;
  const newTask = {
    id: lastIndex + 1,
    title,
    description,
    completed: false,
    priority,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "invalid id" });

  tasks[index] = {
    ...tasks[index],
    title: title || tasks[index].title,
    description: description || tasks[index].description,
    priority: priority || tasks[index].priority,
  };

  return res
    .status(200)
    .json({ message: "task updated successfully", data: tasks[index] });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "invalid id" });

  const deletedTask = tasks.splice(index, 1);
  return res
    .status(200)
    .json({ message: "task deleted successfully", data: deletedTask });
};

const toggleStatus = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) res.status(400).json({ message: "invalid id" });
  tasks[index].completed = !tasks[index].completed;
  return res.status(200).json("status updated successfully");
};

module.exports = {
  getAllTasks,
  getTaskById,
  addtask,
  updateTask,
  deleteTask,
  toggleStatus,
};
