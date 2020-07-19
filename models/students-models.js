const students = [
  {
    student: "commonstudent1@gmail.com",
    teachers: ["teacherken@gmail.com", "teacherjoe@gmail.com"],
    suspended: false,
  },
  {
    student: "commonstudent2@gmail.com",
    teachers: ["teacherken@gmail.com", "teacherjoe@gmail.com"],
    suspended: false,
  },
  {
    student: "student_only_under_teacher_ken@gmail.com",
    teachers: ["teacherken@gmail.com"],
    suspended: false,
  },
  { student: "student4@email.com", teachers: [], suspended: false },
  { student: "student5@email.com", teachers: [], suspended: false },
];

module.exports = students;
