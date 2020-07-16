const express = require("express");
const studentsRouter = express.Router();
const students = require("../models/students-models");

// GET: List all students
studentsRouter.get("/", (req, res, next) => {
  res.json({ message: "All students", students });
});

// GET: List specific student
studentsRouter.get("/:email", (req, res, next) => {
  const queriedStudentEmail = req.params.email;
  const found = students.some((t) => t.email === queriedStudentEmail);
  if (found) {
    const student = students.filter((t) => t.email === queriedStudentEmail);
    res.json({
      message: "Student found",
      student: student,
    });
  } else {
    res.json({
      message: "Student not found",
    });
  }
});

// POST: create a student
studentsRouter.post("/", (req, res, next) => {
  // check if student exists
  const newStudent = req.body;
  const found = students.some((t) => t.email === newStudent.email);
  if (!found) {
    students.push(newStudent);
    res.json({
      message: "New student created",
      new_student: newStudent,
      students,
    });
  } else {
    res.json({
      message: `Student email: '${newStudent.email}' already exists!`,
    });
  }
});

// PUT: update a student
studentsRouter.put("/:email", (req, res, next) => {
  const currentEmail = req.params.email;
  const updatedEmail = req.body.email;
  const found = students.some((t) => t.email === currentEmail);
  if (found) {
    const updatedStudents = students.map((t) =>
      t.email === currentEmail
        ? { email: (t.email = updatedEmail) }
        : { email: t.email }
    );
    res.json({
      message: `Updated student`,
      updated_student: {
        old: currentEmail,
        new: updatedEmail,
      },
      students: updatedStudents,
    });
  } else {
    res.json({ message: `Student with ${currentEmail} not found!` });
  }
});

// DELETE: remove a student
studentsRouter.delete("/:email", (req, res, next) => {
  // check if student exists
  const deleteStudentEmail = req.params.email;
  const found = students.some((t) => t.email === deleteStudentEmail);
  if (found) {
    // splice out the student that should be deleted
    students.splice(
      students.findIndex((t) => t.email === deleteStudentEmail),
      1
    );
    res.json({
      message: "Student deleted",
      deleted_student_email: deleteStudentEmail,
      students,
    });
  } else {
    res.json({
      message: `Student email: '${deleteStudentEmail}' does not exist!`,
    });
  }
});

module.exports = studentsRouter;
