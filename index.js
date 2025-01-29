import Logger from "./logger/logger.js";

const logger  = new Logger()

logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")
logger.error(new Error("Error 123"))

console.log({
    APP_ENV: process.env['APP_ENV'],
    DB_PASS: process.env['DB_PASS'],
    PID: process.pid
})

await sleep(5000)

async function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

console.log("finished code");