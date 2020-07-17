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
  const registerStudents = req.body;
  // find the teacher you want to register students under
  const teacher = teachers.filter(
    (t) => t.teacher === registerStudents.teacher
  )[0];
  const difference = registerStudents.students.filter(
    (regS) => !teacher.students.includes(regS)
  );
  difference.forEach((s) => teacher.students.push(s));
  if (!difference.length) {
    return res.json({
      message: `Requested students have already been registered to the ${registerStudents.teacher}`,
    });
  }
  res.json({
    message: `${difference.length} students registered for ${registerStudents.teacher}`,
    teacher,
  });
});

// GET: retrieve a list of students common to a given list of teachers

// POST: suspend a specified student

// POST: retrieve a list of students who can receive a given notification

module.exports = specialRouter;
