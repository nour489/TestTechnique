let levels = ["OFF", "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
var os = require("os");
const chalk = require('chalk');

let grayLogger = require('gelf-pro');


grayLogger.setConfig({
  adapterName: 'tcp',
  adapterOptions: {
    host: ENV.GRAYLOG_HOST,
    port: ENV.GRAYLOG_PORT
  }
});

global.logger = function(req, level, full_message, message) {
  let pattern = {
    version: "1.0.0",
    timestamp: new Date(),
    full_message: full_message,
    stack: full_message.stack,
    hostName: os.hostname(),
    level: level,
    level_name: levels[level],

    url: req?.originalUrl,
    service_name: "urp-coverage-evolved"
  }
  message = (!message) ? full_message : message
  message = (!message) ? "empty message" : message
  console.log(chalk.red(message));
  //grayLogger.info("Hello world");

  console.log(grayLogger.info(message, pattern))
}
