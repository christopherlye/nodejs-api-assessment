import mysql from "mysql";

let mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connection to mysql DB successful");
  } else {
    console.log(err);
    console.log("Connection to mysql DB failed");
  }
});

export { mysqlConnection };
