const { Router } = require("express");
const { teachers } = require("../controllers");

const router = Router();

router.route("/").get(teachers.getAllTeachers).post(teachers.createTeacher);

router
  .route("/:teacher")
  .get(teachers.getOneTeacher)
  .put(teachers.updateTeacher)
  .delete(teachers.deleteTeacher);

module.exports = router;
