import teachers from "../../../mocks/teachers.js";

// PUT: update a teacher
const updateTeacher = (req, res, next) => {
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
};

export { updateTeacher };
