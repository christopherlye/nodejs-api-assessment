import express from "express";
import { teachers } from "../controllers/index.js";

const router = express.Router();

router.route("/").get(teachers.getAllTeachers).post(teachers.createTeacher);

router
  .route("/:teacher")
  .get(teachers.getOneTeacher)
  .put(teachers.updateTeacher)
  .delete(teachers.deleteTeacher);

export { router };
