const createTeacher = require("./create");
const { getAllTeachers, getOneTeacher } = require("./read");
const updateTeacher = require("./update");
const deleteTeacher = require("./delete");

module.exports = {
  createTeacher,
  getAllTeachers,
  getOneTeacher,
  updateTeacher,
  deleteTeacher,
};
