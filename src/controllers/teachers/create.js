import teachers from "../../../mocks/teachers.js";

// POST: create a teacher
const createTeacher = (req, res, next) => {
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
};

export { createTeacher };
