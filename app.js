import express from 'express';
import { PORT } from './config/env.js'

import userRouter from './routes/user.Route.js';
import authRouter from './routes/auth.Route.js';
import subscriptionRouter from './routes/subscription.Route.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
  res.send('Welcome to SubDev!');
});

app.listen(PORT, () => {
    console.log(`SubDev API is running on http://localhost:${PORT}`);
});