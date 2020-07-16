const express = require("express");
const studentsRouter = express.Router();
const students = require("../models/students-models");

// GET: List all students
studentsRouter.get("/", (req, res, next) => {
  res.json({ message: "All students", results: students });
});

// GET: List specific student
studentsRouter.get("/:student", (req, res, next) => {
  const queriedStudent = req.params.student;
  const found = students.some((s) => s.student === queriedStudent);
  if (found) {
    const student = students.filter((s) => s.student === queriedStudent);
    res.json({
      message: "Student found",
      results: student,
    });
  } else {
    res.json({
      message: "Student not found",
    });
  }
});

// POST: create a student
studentsRouter.post("/", (req, res, next) => {
  // check if there is an email field
  if (req.body.student) {
    const newStudent = req.body.student;
    // check if student exists
    const found = students.some((t) => t.student === newStudent.student);
    if (!found) {
      students.push({ student: newStudent, teachers: [], suspended: false });
      res.json({
        message: "New student created",
        new_student: newStudent,
        results: students,
      });
    } else {
      res.json({
        message: `Student email: '${newStudent.student}' already exists!`,
      });
    }
  } else {
    res.json({ message: `Student email must be filled!` });
  }
});

// PUT: update a student
studentsRouter.put("/:student", (req, res, next) => {
  const current = req.params.student;
  const updated = req.body.student;
  const found = students.some((s) => s.student === current);
  if (found) {
    students.map((s) =>
      s.student === current
        ? { student: (s.student = updated) }
        : { student: s.student }
    );
    res.json({
      message: `Updated student`,
      updated_student: {
        old: current,
        new: updated,
      },
      results: students,
    });
  } else {
    res.json({ message: `Student with ${current} not found!` });
  }
});

// DELETE: remove a student
studentsRouter.delete("/:student", (req, res, next) => {
  // check if student exists
  const deleteStudent = req.params.student;
  const found = students.some((s) => s.student === deleteStudent);
  if (found) {
    // splice out the student that should be deleted
    students.splice(
      students.findIndex((s) => s.student === deleteStudent),
      1
    );
    res.json({
      message: "Student deleted",
      deleted_student: deleteStudent,
      results: students,
    });
  } else {
    res.json({
      message: `Student student: '${deleteStudent}' does not exist!`,
    });
  }
});

module.exports = studentsRouter;
