const express = require("express");
const taskRouter = require("./routes/task.route");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/tasks", taskRouter);

app.use(errorHandlerMiddleware);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
