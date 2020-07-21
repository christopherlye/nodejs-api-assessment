const teachers = require("../../../mocks/teachers");
const mysqlConnection = require("../../connection");

// GET: List all teachers
const getAllTeachers = (req, res, next) => {
  mysqlConnection.query("SELECT * FROM teachers", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
  res.status(200).json({ message: "All teachers", results: teachers });
};

// GET: List specific teacher
const getOneTeacher = (req, res, next) => {
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
};

module.exports = {
  getAllTeachers,
  getOneTeacher,
};
