const { Router } = require("express");
const {
  getAllTasks,
  getTaskById,
  addtask,
  updateTask,
  deleteTask,
  toggleStatus,
} = require("../services/task.service");

const taskRouter = Router();

taskRouter.get("/", getAllTasks);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/", addtask);

taskRouter.put("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);

taskRouter.patch("/:id/toggle", toggleStatus);

module.exports = taskRouter;
