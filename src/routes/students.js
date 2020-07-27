import express from "express";
import { students } from "../controllers/index.js";

const router = express.Router();

router.route("/").get(students.getAllStudents).post(students.createStudent);

router
  .route("/:student")
  .get(students.getOneStudent)
  .put(students.updateStudent)
  .delete(students.deleteStudent);

export { router };
