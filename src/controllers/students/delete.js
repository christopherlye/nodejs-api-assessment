const students = require("../../../mocks/students");

// DELETE: remove a student
const deleteStudent = (req, res, next) => {
  // check if student exists
  const deleteStudent = req.params.student;
  const found = students.some((s) => s.student === deleteStudent);
  if (found) {
    // splice out the student that should be deleted
    students.splice(
      students.findIndex((s) => s.student === deleteStudent),
      1
    );
    // Note: should remove the connected student in the teachers DB too!
    res.status(201).json({
      message: "Student deleted",
      deleted_student: deleteStudent,
      results: students,
    });
  } else {
    res.status(404).json({
      message: `Student student: '${deleteStudent}' does not exist!`,
    });
  }
};

module.exports = deleteStudent;
