const teachers = [
  { teacher: "teacher1@email.com", students: [], notification: "" },
  { teacher: "teacher2@email.com", students: [], notification: "" },
  { teacher: "teacher3@email.com", students: [], notification: "" },
  { teacher: "teacher4@email.com", students: [], notification: "" },
  {
    teacher: "teacher5@email.com",
    students: ["commonstudent1@gmail.com"],
    notification: "",
  },
  {
    teacher: "teacherken@gmail.com",
    students: [
      "commonstudent1@gmail.com",
      "commonstudent2@gmail.com",
      "student_only_under_teacher_ken@gmail.com",
    ],
    notification: "",
  },
  {
    teacher: "teacherjoe@gmail.com",
    students: ["commonstudent1@gmail.com", "commonstudent2@gmail.com"],
    notification: "",
  },
];

export default teachers;
