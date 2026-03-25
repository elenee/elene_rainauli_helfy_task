const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("help");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
