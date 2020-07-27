import teachers from "../../../mocks/teachers.js";

// DELETE: remove a teacher
const deleteTeacher = (req, res, next) => {
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
};

export { deleteTeacher };
