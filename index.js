import express from 'express';
import authRoutes from './routes/authRoutes.js';
import itemsRouter from './routes/items.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import Logger from "./logger/logger.js";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/items', authenticateToken, itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
