import express from 'express';
import loggingMiddleware from './middleware/logging';
import userRouter from './routes/users';

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});