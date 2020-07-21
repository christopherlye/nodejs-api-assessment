const express = require("express");
const app = express();
const { PORT } = require("./config");
const { teachersRoutes, studentsRoutes, apiRoutes } = require("./routes");
const mysqlConnection = require("./connection");

// Middleware to parse incoming json
app.use(express.json());

// Middleware to connect teachers, students and special routes
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api", apiRoutes);

app.get("/", (req, res, next) => res.json({ message: "Server is working" }));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
