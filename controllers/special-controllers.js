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
  // should register teacher with the students too
  res.json({
    message: `${difference.length} students registered for ${registerStudents.teacher}`,
    teacher,
  });
});

// GET: retrieve a list of students common to a given list of teachers
specialRouter.get("/commonstudents", (req, res, next) => {
  const queryString = req.query;
  const queried_teachers = Array.isArray(queryString.teacher)
    ? queryString.teacher
    : [queryString.teacher];
  // Step 1: Check if teacher(s) exists in the teachers DB
  const teachers_exists = teachers.filter((t) =>
    queried_teachers.includes(t.teacher)
  );
  if (!teachers_exists)
    return res.json({ message: `The queried teachers do not exist` });
  // Step 2: If it's one teacher, list out the students
  if (teachers_exists.length === 1)
    return res.status(200).json({
      message: `Successfully retrieved list of students for ${teachers_exists[0].teacher}`,
      students: teachers_exists[0].students,
    });
  // Step 3: If it's more than one teacher, get the common students among all the teachers
  if (teachers_exists.length > 1) {
    let common_students;
    // check that all teachers in teachers_exists array have at least 1 student. else say that there are no common students
    for (let t of teachers_exists) {
      if (t.students.length === 0) {
        return res.json({ message: `No common students found` });
      }
    }
    for (let i = 0; i < teachers_exists.length; i++) {
      if (teachers_exists[i + 1]) {
        common_students = teachers_exists[0].students.filter((s) =>
          teachers_exists[i + 1].students.includes(s)
        );
      }
    }
    res.status(200).json({
      message: `Successfully retrieved list of students for ${teachers_exists
        .map((t) => t.teacher)
        .toString()}`,
      common_students,
    });
  }
});

// POST: suspend a specified student

// POST: retrieve a list of students who can receive a given notification

module.exports = specialRouter;
