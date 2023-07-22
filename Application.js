const express = require("express");
const Logger = require("./utils/Logger");
const dotenv = require("dotenv");

class Application {
  constructor() {
    dotenv.config();
    this.app = express();
    this.logger = new Logger();
  }

  start() {
    this.addEndpoints();

    this.app.listen(process.env.PORT, () => {
      this.logger.info(`Listening on port ${process.env.PORT}...`);
    });
  }

  addEndpoints() {
    this.app.get("/health-check", (req, res) => {
      return res.json({ message: "Hello World!" });
    });
  }
}

module.exports = Application;
