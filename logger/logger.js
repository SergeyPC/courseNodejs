import fs from "node:fs"; 
import path from "node:path";
import { levels } from "./levels.js";
import formatMessage from "./formatter.js";
import { EventEmitter } from "node:events";
import { Transform, Writable } from "node:stream";
import chalk from "chalk";

const levelColors = {
  info: chalk.blue,
  warning: chalk.yellowBright, 
  error: chalk.red
};

class LogTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(logObj, encoding, callback) {
    const { message, type } = logObj;
    const timestamp = new Date().toISOString();

    const colorize = levelColors[type] || chalk.white; 

    const formattedMessage = `[${timestamp}], ${colorize(message)}`;
    
    console.log(colorize(formattedMessage));

    callback(null, formattedMessage + "\n");
  }
}

class Logger extends EventEmitter {
  constructor(logPath = "logs/app.log") {
    super();
    this.logPath = logPath;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), {
        recursive: true,
      });
    }

    this.logStream = fs.createWriteStream(this.logPath, { flags: "a" });

    this.transformer = new LogTransformer();

    this.transformer.pipe(this.logStream);

    this.on("log", (logObj) => {
      this.transformer.write(logObj);
    });
  }

  __log(level, msg) {
    const formattedMsg = formatMessage(level, msg);
    this.emit("log", { message: formattedMsg, type: level });
  }

  info(msg) {
    this.__log(levels.INFO, msg);
  }

  warning(msg) {
    this.__log(levels.WARNING, msg);
  }

  error(msg) {
    this.__log(levels.ERROR, msg);
  }
}

export default Logger;
