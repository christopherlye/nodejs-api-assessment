const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res, next) => res.json({ message: "Server is working" }));

app.listen(PORT, () => console.log(`listening to PORT`));
