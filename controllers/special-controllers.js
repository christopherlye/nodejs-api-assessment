const express = require("express");
const specialRouter = express.Router();
const teachers = require("../models/teachers-models");
const students = require("../models/students-models");

// GET: test special route
specialRouter.get("/", (req, res, next) => {
  res.json({ message: "Special routes working..." });
});

// POST: register one or more students to a specified teacher
specialRouter.post("/register", (req, res, next) => {
  const registerStudents = {
    teacher: "teacher1@email.com",
    students: ["student1@email.com", "student9@email.com"],
  };
  // find the teacher
  const teacher = teachers.filter(
    (t) => t.teacher === registerStudents.teacher
  )[0];
  // update the students if not already there

  res.json({ message: `Students registered for ${registerStudents.teacher}` });
});

// GET: retrieve a list of students common to a given list of teachers

// POST: suspend a specified student

// POST: retrieve a list of students who can receive a given notification

module.exports = specialRouter;
