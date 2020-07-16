const express = require("express");
const studentsRouter = express.Router();

// GET all students
studentsRouter.get("/", (req, res, next) => {
  res.json({ message: "GET all students routes working..." });
});

// GET specific student
studentsRouter.get("/:id", (req, res, next) => {
  res.json({
    message: "GET specific student route working...",
    id: req.params.id,
  });
});

module.exports = studentsRouter;
