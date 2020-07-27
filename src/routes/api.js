import express from "express";
import * as api from "../controllers/api/index.js";

const router = express.Router();

router.route("/register").post(api.registerStudents);

router.route("/commonstudents").get(api.getCommonStudents);

router.route("/suspend").post(api.suspendStudent);

router.route("/retrievefornotifications").post(api.retrieveNotifList);

export { router };
