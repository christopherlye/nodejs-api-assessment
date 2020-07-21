const teachers = require("../../../mocks/teachers");
const students = require("../../../mocks/students");

// POST: register one or more students to a specified teacher
const registerStudents = (req, res, next) => {
  const registerStudents = req.body;
  // Step 1: Find the teacher you want to register students under
  const teacher = teachers.find((t) => t.teacher === registerStudents.teacher);
  // Step 2: Check if teacher exists
  if (!teacher) {
    const resp = {
      message: `Teacher ${registerStudents.teacher} does not exist!`,
    };
    console.log(resp);
    return res.status(404).json(resp);
  }
  // Step 3: Determine the differences in the arrays
  const difference = registerStudents.students.filter(
    (regS) => !teacher.students.includes(regS)
  );

  // Step 4: If there is no difference, do not append
  if (!difference.length) {
    const resp = {
      message: `Requested students have already been registered to the ${registerStudents.teacher}`,
    };
    console.log(resp);
    return res.status(400).json(resp);
  }
  // Step 5: Append the differences to the original array
  difference.forEach((s) => teacher.students.push(s));

  // Step 6: Check if registered students currently exists in students DB.
  // if exists, append the teacher
  students.map((s) => {
    if (teacher.students.includes(s.student)) {
      s.teachers.push(teacher.teacher);
    }
  });
  // if doesn't exist, append the new student
  teacher.students.map((s) => {
    students.every((student) => student.student !== s)
      ? students.push({
          student: s,
          teachers: [teacher.teacher],
          suspended: false,
        })
      : null;
  });

  const resp = {
    message: `${difference.length} students registered for ${registerStudents.teacher}`,
    teacher,
  };
  console.log(resp);
  res.status(204).end();
};

module.exports = registerStudents;
