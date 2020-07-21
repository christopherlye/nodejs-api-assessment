const { Router } = require("express");
const { api } = require("../controllers");

const router = Router();

router.route("/register").post(api.registerStudents);

router.route("/commonstudents").get(api.getCommonStudents);

router.route("/suspend").post(api.suspendStudent);

router.route("/retrievefornotifications").post(api.retrieveNotifList);

module.exports = router;
