const { createLogger, format, transports } = require("winston");
const chalk = require("chalk");
// const log = require("./console-logger");
const dayjs = require("dayjs");

const logColorizedFormatter = format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  var logMessage = stack || message;

  var outputLog = `${timestamp} [${level}]: ${logMessage}`;

  switch (level.toUpperCase()) {
    case "INFO":
      outputLog = chalk.blueBright(outputLog);
      break;

    case "WARN":
      outputLog = chalk.yellowBright(outputLog);
      break;

    case "SUCCESS":
      outputLog = chalk.greenBright(outputLog);
      break;

    case "ERROR":
      outputLog = chalk.redBright(outputLog);
      break;

    default:
      break;
  }
  return outputLog;
  // return `{"timestamp": "${timestamp}", "level": "${colorizedLevel}", "message": "${errorMessage}"}`;
  // return `${timestamp} ${colorizedLevel}: ${logMessage}`;
});

const logFormatter = format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  var logMessage = stack || message;

  var outputLog = `${timestamp} [${level}]: ${logMessage}`;

  return outputLog;
});

const log = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      level: "verbose",
      colorize: true,
      format: logColorizedFormatter,
    }),
    new transports.File({
      json: true,
      format: logFormatter,
      // maxFiles: 5,
      level: "debug",
      colorize: false,
      filename: `logs/log${dayjs().format("YYYYMMDD")}.log`,
      maxsize: 5242880, // 5MB
    }),
  ],
});

// const logToFile = createLogger({
//   format: format.combine(
//     format.timestamp({
//       format: "YYYY-MM-DD HH:mm:ss",
//     }),
//     format.errors({ stack: true }),
//     format.json()
//   ),
//   transports: [
//     new transports.File({
//       json: true,
//       maxFiles: 5,
//       level: "verbose",
//       colorize: false,
//       filename: `logs/log-${dayjs().format("YYYYMMDD")}.log`,
//       maxsize: 5242880, // 5MB
//     }),
//   ],
// });

// const logToConsole = createLogger({
//   level: "info",
//   format: format.errors({ stack: true }),
//   transports: [
//     new transports.Console({
//       format: format.combine(
//         format.colorize(),
//         format.simple(),
//         format.timestamp(),
//         logFormatter
//       ),
//     }),
//   ],
// });

module.exports = {
  log,
  // logToFile,
  // logToConsole,
};
