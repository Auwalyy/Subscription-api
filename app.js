import express from 'express';
import { PORT } from './config/env.js'
import { configDotenv } from 'dotenv';
import userRouter from './routes/user.Route.js';
import authRouter from './routes/auth.Route.js';
import subscriptionRouter from './routes/subscription.Route.js';
import connetToDatabase from './config/database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import arcjetMiddlleware from './middleware/arcject.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


dotenv.config(); // automatically loads .env from project root

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended :false}))
app.use(cookieParser())
app.use(arcjetMiddlleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('api/v1/workflows', workflowRouter);

app.use(errorMiddleware) /// error middleware

app.get('/', (req, res) => {
  res.send('Welcome to SubDev!');
});

app.listen(PORT, async () => {
    console.log(`SubDev API is running on http://localhost:${PORT}`);

    await connetToDatabase();
});