import teachers from "../../../mocks/teachers.js";
import students from "../../../mocks/students.js";

// GET: retrieve a list of students common to a given list of teachers
const getCommonStudents = (req, res, next) => {
  const queryString = req.query;
  const queried_teachers = Array.isArray(queryString.teacher)
    ? queryString.teacher
    : [queryString.teacher];
  // Step 1: Check if teacher(s) exists in the teachers DB
  const teachers_exists = teachers.filter((t) =>
    queried_teachers.includes(t.teacher)
  );
  if (!teachers_exists) {
    const resp = { message: `The queried teachers do not exist` };
    console.log(resp);
    return res.status(404).json(resp);
  }
  // Step 2: If it's one teacher, list out the students
  if (teachers_exists.length === 1)
    return res.status(200).json({
      message: `Successfully retrieved list of students for ${teachers_exists[0].teacher}`,
      students: teachers_exists[0].students,
    });
  // Step 3: If it's more than one teacher, get the common students among all the teachers
  if (teachers_exists.length > 1) {
    let common_students;
    // check that all teachers in teachers_exists array have at least 1 student. else say that there are no common students
    for (let t of teachers_exists) {
      if (t.students.length === 0) {
        const resp = { message: `No common students found` };
        console.log(resp);
        return res.status(404).json(resp);
      }
    }
    for (let i = 0; i < teachers_exists.length; i++) {
      if (teachers_exists[i + 1]) {
        common_students = teachers_exists[0].students.filter((s) =>
          teachers_exists[i + 1].students.includes(s)
        );
      }
    }
    const resp = {
      message: `Successfully retrieved list of students for ${teachers_exists
        .map((t) => t.teacher)
        .toString()}`,
      common_students,
    };
    console.log(resp);
    res.status(200).json(resp);
  }
};

export { getCommonStudents };
