const express = require("express");
const specialRouter = express.Router();
const teachers = require("../models/teachers-models");
const students = require("../models/students-models");

// GET: test special route
specialRouter.get("/", (req, res, next) => {
  res.json({ message: "Special routes working..." });
});

// POST: register one or more students to a specified teacher
specialRouter.post("/register", (req, res, next) => {
  const registerStudents = req.body;
  // Step 1: Find the teacher you want to register students under
  const teacher = teachers.find((t) => t.teacher === registerStudents.teacher);
  // Step 2: Check if teacher exists
  if (!teacher)
    return res.json({
      message: `Teacher ${registerStudents.teacher} does not exist!`,
    });
  // Step 3: Determine the differences in the arrays
  const difference = registerStudents.students.filter(
    (regS) => !teacher.students.includes(regS)
  );

  // Step 4: If there is no difference, do not append
  if (!difference.length) {
    return res.json({
      message: `Requested students have already been registered to the ${registerStudents.teacher}`,
    });
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
  console.log(students);

  res.json({
    message: `${difference.length} students registered for ${registerStudents.teacher}`,
    teacher,
  });
});

// GET: retrieve a list of students common to a given list of teachers
specialRouter.get("/commonstudents", (req, res, next) => {
  const queryString = req.query;
  const queried_teachers = Array.isArray(queryString.teacher)
    ? queryString.teacher
    : [queryString.teacher];
  // Step 1: Check if teacher(s) exists in the teachers DB
  const teachers_exists = teachers.filter((t) =>
    queried_teachers.includes(t.teacher)
  );
  if (!teachers_exists)
    return res.json({ message: `The queried teachers do not exist` });
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
        return res.json({ message: `No common students found` });
      }
    }
    for (let i = 0; i < teachers_exists.length; i++) {
      if (teachers_exists[i + 1]) {
        common_students = teachers_exists[0].students.filter((s) =>
          teachers_exists[i + 1].students.includes(s)
        );
      }
    }
    res.status(200).json({
      message: `Successfully retrieved list of students for ${teachers_exists
        .map((t) => t.teacher)
        .toString()}`,
      common_students,
    });
  }
});

// POST: suspend a specified student
specialRouter.post("/suspend", (req, res, next) => {
  const suspendedStudent = req.body.student;
  // Step 1: Check if student exists
  const studentExists = students.find((s) => s.student === suspendedStudent);
  if (!studentExists)
    return res.json({ message: `Student ${suspendedStudent} does not exist!` });
  // Step 2: Check if student is already suspended
  const studentSuspended = students.find((s) => s.suspended === true);
  if (studentSuspended)
    return res.json({
      message: `Student ${suspendedStudent} already suspended!`,
    });
  // Step 3: Suspend the student if above conditions are met
  for (let idx in students) {
    if (students[idx].student === suspendedStudent) {
      students[idx].suspended = true;
      return res.status(204).end();
    }
  }
});

// POST: retrieve a list of students who can receive a given notification
specialRouter.post("/retrievefornotifications", (req, res, next) => {
  // Step 1: Check if the teacher exists
  const requestedTeacher = req.body.teacher;
  const teacher = teachers.find((t) => t.teacher === requestedTeacher);
  if (!teacher)
    return res.json({ message: `Teacher ${requestedTeacher} does not exist!` });
  // Step 2: If yes, get the students registered under the requestedTeacher
  const registeredStudents = teacher.students.length
    ? teacher.students.map((s) => s)
    : [];

  // Step 3: Parse the notif string and obtain the list of students
  const notifList = req.body.notification
    .split(" @")
    .filter((str) => str.indexOf("@") !== -1);

  // Step 4: Append the list of mentioned students to a combined list
  let combinedList = [...registeredStudents];
  notifList.forEach((s) => {
    if (!registeredStudents.includes(s)) {
      combinedList.push(s);
    }
  });
  // Step 5: Filter out students that are not suspended
  const recipients = [];
  students.map((s) => {
    if (combinedList.includes(s.student) && s.suspended === false) {
      recipients.push(s.student);
    }
  });
  res.json({
    message: `Successfully retrieved list of students to be notified`,
    recipients,
  });
});

module.exports = specialRouter;
