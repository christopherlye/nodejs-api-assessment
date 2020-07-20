const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mysqlConnection = require("./connection");

// Middleware to parse incoming json
app.use(express.json());

// Middleware to connect teachers & students routes
app.use("/api/teachers", require("./controllers/teachers-controllers"));
app.use("/api/students", require("./controllers/students-controllers"));

// Middleware to connect special routes
app.use("/api", require("./controllers/special-controllers"));

app.get("/", (req, res, next) => res.json({ message: "Server is working" }));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
