const students = require("../../../mocks/students");
const createStudent = require("./create");

// PUT: update a student
const updateStudent = (req, res, next) => {
  const current = req.params.student;
  const updated = req.body.student;
  const found = students.some((s) => s.student === current);
  if (found) {
    students.map((s) =>
      s.student === current
        ? { student: (s.student = updated) }
        : { student: s.student }
    );
    // Note: should update the connected student in the teachers DB too!
    res.status(201).json({
      message: `Updated student`,
      updated_student: {
        old: current,
        new: updated,
      },
      results: students,
    });
  } else {
    res.status(404).json({ message: `Student with ${current} not found!` });
  }
};

module.exports = updateStudent;
