import teachers from "../../../mocks/teachers.js";
import students from "../../../mocks/students.js";

// POST: suspend a specified student
const suspendStudent = (req, res, next) => {
  const suspendedStudent = req.body.student;
  // Step 1: Check if student exists
  const studentExists = students.find((s) => s.student === suspendedStudent);
  if (!studentExists) {
    const resp = { message: `Student ${suspendedStudent} does not exist!` };
    console.log(resp);
    return res.status(404).json(resp);
  }
  // Step 2: Check if student is already suspended
  const alreadySuspended = students.find(
    (s) => s.student === suspendedStudent && s.suspended === true
  );
  if (alreadySuspended) {
    const resp = {
      message: `Student ${suspendedStudent} already suspended!`,
    };
    console.log(resp);
    return res.status(400).json(resp);
  }

  // Step 3: Suspend the student if above conditions are met
  for (let idx in students) {
    if (students[idx].student === suspendedStudent) {
      students[idx].suspended = true;
      const resp = {
        message: `Student ${students[idx].student} is suspended.`,
      };
      console.log(resp);
      return res.status(204).end();
    }
  }
};

export { suspendStudent };
