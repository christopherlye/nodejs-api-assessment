import students from "../../../mocks/students.js";

// POST: create a student
const createStudent = (req, res, next) => {
  // check if there is an email field
  if (req.body.student) {
    const newStudent = req.body.student;
    // check if student exists
    const found = students.some((t) => t.student === newStudent.student);
    if (!found) {
      students.push({ student: newStudent, teachers: [], suspended: false });
      res.status(201).json({
        message: "New student created",
        new_student: newStudent,
        results: students,
      });
    } else {
      res.status(404).json({
        message: `Student email: '${newStudent.student}' already exists!`,
      });
    }
  } else {
    res.status(404).json({ message: `Student email must be filled!` });
  }
};

export { createStudent };
