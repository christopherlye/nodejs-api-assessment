const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming json
app.use(express.json());

// Middle ware to connect teachers & students routes
app.use("/api/teachers", require("./controllers/teachers-controllers"));
app.use("/api/students", require("./controllers/students-controllers"));

app.get("/", (req, res, next) => res.json({ message: "Server is working" }));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
