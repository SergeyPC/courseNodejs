import chalk from "chalk";

function formatMessage(level, msg) {
    if(msg instanceof Error){
        const stackArray = msg.stack.split("\n");
        const path_error = stackArray[1].trim();

        msg = `${msg.message} ${path_error}`;
    }

    console.log("msg ====>", msg);
    
    const timestemp = new Date().toISOString()

    switch(level) {
        case 'info':
            return chalk.blue(`[${timestemp}], INFO: ${msg}`)

        case 'warning':
            return chalk.yellow(`[${timestemp}], WARNING: ${msg}`)

        case 'error':
            return chalk.red(`[${timestemp}], ERROR: ${msg}`)

        default:
        return chalk.gray(`[${timestemp}], UNKNOW: ${msg}`)

    }

}

export default formatMessage