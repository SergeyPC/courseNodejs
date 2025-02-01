import fs from "node:fs"; 
import path from "node:path";
import levels from "./levels.js";
import formatMessage from "./formatter.js";
import { EventEmitter } from "node:events";

class Logger extends EventEmitter {
  constructor(logPath = "logs/app.log") {
    super();
    this.logPath = logPath;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), {
        recursive: true,
      });
    }

    // Обработчик должен добавляться в конструкторе, а не в __log()
    this.on("log", (message) => {
      setImmediate(() => {
        fs.appendFile(this.logPath, `${message} \n`, (err) => {
          if (err) {
            console.error("Error while trying to put data to file", err.message);
          }
        });
      });
    });
  }

  __log(level, msg) {
    const formattedMsg = formatMessage(level, msg);
    this.emit("log", formattedMsg);
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
