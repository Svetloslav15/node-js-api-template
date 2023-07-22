const winston = require("winston");

class Logger {
  constructor() {
    const currentDate = new Date();
    const filePath = `logs/${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}.txt`;
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: filePath }),
      ],
    });
  }

  info(message) {
    this.logger.info(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

module.exports = Logger;
