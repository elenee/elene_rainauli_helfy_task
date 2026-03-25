const express = require("express");
const taskRouter = require("./routes/task.route");
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/tasks", taskRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
