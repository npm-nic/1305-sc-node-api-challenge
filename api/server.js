const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
// const projectsRouter = require("./projectsRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// app.use("/api/projects", projectsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ hello: "world" });
});

module.exports = app;
