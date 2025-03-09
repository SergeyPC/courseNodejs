import chalk from "chalk";

function formatMessage(level, msg) {
    if (msg instanceof Error) {
        const stackArray = msg.stack.split("\n");
        const path_error = stackArray[1].trim();
        msg = `${msg.message} ${path_error}`;
    }

    console.log("msg ====>", msg);

    return `${level.toUpperCase()}: ${msg}`;
}

export default formatMessage;
