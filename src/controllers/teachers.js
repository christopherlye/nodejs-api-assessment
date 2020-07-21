const express = require("express");
const teachersRouter = express.Router();
const teachers = require("../../mocks/teachers");
const students = require("../../mocks/students");
const mysqlConnection = require("../connection");

// GET: List all teachers
teachersRouter.get("/", (req, res, next) => {
  mysqlConnection.query("SELECT * FROM teachers", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
  res.status(200).json({ message: "All teachers", results: teachers });
});

// GET: List specific teacher
teachersRouter.get("/:teacher", (req, res, next) => {
  const queriedTeacherEmail = req.params.teacher;
  const found = teachers.some((t) => t.teacher === queriedTeacherEmail);
  if (found) {
    const teacher = teachers.filter((t) => t.teacher === queriedTeacherEmail);
    res.status(200).json({
      message: "Teacher found",
      results: teacher,
    });
  } else {
    res.status(404).json({
      message: "Teacher not found",
    });
  }
});

// POST: create a teacher
teachersRouter.post("/", (req, res, next) => {
  // check if there is an email field
  if (req.body.teacher) {
    const newTeacher = req.body.teacher;
    // check if teacher exists
    const found = teachers.some((t) => t.teacher === newTeacher.teacher);
    if (!found) {
      teachers.push({ teacher: newTeacher, students: [], notification: "" });
      res.status(201).json({
        message: "New teacher created",
        new_teacher: newTeacher,
        results: teachers,
      });
    } else {
      res.status(400).json({
        message: `Teacher email: '${newTeacher.teacher}' already exists!`,
      });
    }
  } else {
    res.status(400).json({ message: `Teacher email must be filled!` });
  }
});

// PUT: update a teacher
teachersRouter.put("/:teacher", (req, res, next) => {
  const currentEmail = req.params.teacher;
  const updatedEmail = req.body.teacher;
  const found = teachers.some((t) => t.teacher === currentEmail);
  if (found) {
    teachers.map((t) =>
      t.teacher === currentEmail
        ? { teacher: (t.teacher = updatedEmail) }
        : { teacher: t.teacher }
    );
    // Note: should update the connected teacher in the students DB too!

    res.status(201).json({
      message: `Updated teacher`,
      updated_teacher: {
        old: currentEmail,
        new: updatedEmail,
      },
      results: teachers,
    });
  } else {
    res
      .status(404)
      .json({ message: `Teacher with ${currentEmail} not found!` });
  }
});

// DELETE: remove a teacher
teachersRouter.delete("/:teacher", (req, res, next) => {
  // check if teacher exists
  const deleteTeacherEmail = req.params.teacher;
  const found = teachers.some((t) => t.teacher === deleteTeacherEmail);
  if (found) {
    // splice out the teacher that should be deleted

    teachers.splice(
      teachers.findIndex((t) => t.teacher === deleteTeacherEmail),
      1
    );
    // Note: should remove the connected teacher in the students DB too!

    res.status(201).json({
      message: "Teacher deleted",
      deleted_teacher: deleteTeacherEmail,
      results: teachers,
    });
  } else {
    res.status(404).json({
      message: `Teacher email: '${deleteTeacherEmail}' does not exist!`,
    });
  }
});

module.exports = teachersRouter;