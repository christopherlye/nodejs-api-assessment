require("dotenv").config();
const mysql = require("mysql");

let mysqlConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connection successful");
  } else {
    console.log(err);
    console.log("Connection failed");
  }
});

module.exports = mysqlConnection;
