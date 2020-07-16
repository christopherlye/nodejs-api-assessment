const express = require("express");
const teachersRouter = express.Router();
const teachers = require("../models/teachers-models");

// GET all teachers
teachersRouter.get("/", (req, res, next) => {
  res.json({ message: "All teachers", teachers });
});

// GET specific teacher
teachersRouter.get("/:email", (req, res, next) => {
  const queriedTeacherEmail = req.params.email;
  const found = teachers.some((t) => t.email === queriedTeacherEmail);
  if (found) {
    const teacher = teachers.filter((t) => t.email === queriedTeacherEmail);
    res.json({
      message: "Teacher found",
      teacher: teacher,
    });
  } else {
    res.json({
      message: "Teacher not found",
    });
  }
});

// POST create a teacher
teachersRouter.post("/", (req, res, next) => {
  // check if teacher exists
  const newTeacher = req.body;
  const found = teachers.some((t) => t.email === newTeacher.email);
  if (!found) {
    teachers.push(newTeacher);
    res.json({
      message: "New teacher created",
      new_teacher: newTeacher,
      teachers,
    });
  } else {
    res.json({
      message: `Teacher email: '${newTeacher.email}' already exists!`,
    });
  }
});

// PUT update a teacher
teachersRouter.put("/:email", (req, res, next) => {
  const currentEmail = req.params.email;
  const updatedEmail = req.body.email;
  const found = teachers.some((t) => t.email === currentEmail);
  if (found) {
    const updatedTeachers = teachers.map((t) =>
      t.email === currentEmail
        ? { email: (t.email = updatedEmail) }
        : { email: t.email }
    );
    res.json({
      message: `Updated teacher`,
      updated_teacher: {
        old: currentEmail,
        new: updatedEmail,
      },
      teachers: updatedTeachers,
    });
  } else {
    res.json({ message: `Teacher with ${currentEmail} not found!` });
  }
});

// DELETE remove a teacher
teachersRouter.delete("/:email", (req, res, next) => {
  // check if teacher exists
  const deleteTeacherEmail = req.params.email;
  const found = teachers.some((t) => t.email === deleteTeacherEmail);
  if (found) {
    // splice out the teacher that should be deleted
    teachers.splice(
      teachers.findIndex((t) => t.email === deleteTeacherEmail),
      1
    );
    res.json({
      message: "Teacher deleted",
      deleted_teacher_email: deleteTeacherEmail,
      teachers,
    });
  } else {
    res.json({
      message: `Teacher email: '${deleteTeacherEmail}' does not exist!`,
    });
  }
});

module.exports = teachersRouter;
