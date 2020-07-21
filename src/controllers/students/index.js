const createStudent = require("./create");
const { getAllStudents, getOneStudent } = require("./read");
const updateStudent = require("./update");
const deleteStudent = require("./delete");

module.exports = {
  createStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
};
