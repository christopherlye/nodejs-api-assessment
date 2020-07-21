const dotenv = require("dotenv");
const envVarsLoaded = dotenv.config();

if (!envVarsLoaded) throw new Error("env vars not loaded");

const PORT = process.env.PORT;

module.exports = {
  PORT,
};
