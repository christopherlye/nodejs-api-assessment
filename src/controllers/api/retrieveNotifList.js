import teachers from "../../../mocks/teachers.js";
import students from "../../../mocks/students.js";

// POST: retrieve a list of students who can receive a given notification
const retrieveNotifList = (req, res, next) => {
  // Step 1: Check if the teacher exists
  const requestedTeacher = req.body.teacher;
  const teacher = teachers.find((t) => t.teacher === requestedTeacher);
  if (!teacher) {
    const resp = { message: `Teacher ${requestedTeacher} does not exist!` };
    console.log(resp);
    return res.status(404).json(resp);
  }
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
  const resp = {
    message: `Successfully retrieved list of students to be notified`,
    recipients,
  };
  console.log(resp);
  res.status(200).json(resp);
};

export { retrieveNotifList };
