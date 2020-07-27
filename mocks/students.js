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
  { student: "studentmary@gmail.com", teachers: [], suspended: false },
  { student: "studentagnes@gmail.com", teachers: [], suspended: false },
  { student: "studentmiche@gmail.com", teachers: [], suspended: true },
];

export default students;
