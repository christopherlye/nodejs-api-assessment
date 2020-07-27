import students from "../../../mocks/students.js";

// GET: List all students
const getAllStudents = (req, res, next) => {
  res.status(200).json({ message: "All students", results: students });
};

// GET: List specific student
const getOneStudent = (req, res, next) => {
  const queriedStudent = req.params.student;
  const found = students.some((s) => s.student === queriedStudent);
  if (found) {
    const student = students.filter((s) => s.student === queriedStudent);
    res.status(200).json({
      message: "Student found",
      results: student,
    });
  } else {
    res.status(404).json({
      message: "Student not found",
    });
  }
};

export { getAllStudents, getOneStudent };
