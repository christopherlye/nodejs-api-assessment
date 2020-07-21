const { Router } = require("express");
const { students } = require("../controllers");

const router = Router();

router.route("/").get(students.getAllStudents).post(students.createStudent);

router
  .route("/:student")
  .get(students.getOneStudent)
  .put(students.updateStudent)
  .delete(students.deleteStudent);

module.exports = router;
