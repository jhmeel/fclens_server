import winston from "winston";
import Config from "../config/config.js";
const { createLogger, transports } = winston;
const { combine, colorize, timestamp, printf } = winston.format;
const { LOG_STORAGE_PATH, MAX_LOG_FILE, MAX_LOG_FILE_SIZE } = Config.LOGGER;

// log format
const logFormat = combine(
  colorize({
    all: true,
  }),
  timestamp(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

//logger with a rotating file transport
const logger = createLogger({
  level: "debug",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: LOG_STORAGE_PATH,
      maxFiles: MAX_LOG_FILE,
      maxsize: MAX_LOG_FILE_SIZE, 
    }),
  ],
});

export default logger