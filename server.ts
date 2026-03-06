import 'dotenv/config';
import express from 'express';
import loggingMiddleware from './middleware/logging';
import userRouter from './routes/users';
import defaultRouter from './routes/default';
import { connectDB } from './config/db';

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

app.use(defaultRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT;


async function start() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();