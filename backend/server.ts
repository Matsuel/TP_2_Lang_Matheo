import 'dotenv/config';
import express from 'express';
import loggingMiddleware from './middleware/logging';
import errorHandler from './middleware/errorHandler';
import userRouter from './routes/users';
import defaultRouter from './routes/default';
import { connectDB } from './config/db';

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

app.use(defaultRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});