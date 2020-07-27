import express from "express";
const app = express();
import { PORT } from "./config/index.js";
import { teachersRoutes, studentsRoutes, apiRoutes } from "./routes/index.js";
import { mysqlConnection } from "./connection.js";

// Middleware to parse incoming json
app.use(express.json());

// Middleware to connect teachers, students and special routes
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api", apiRoutes);

app.get("/", (req, res, next) => res.json({ message: "Server is working" }));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
