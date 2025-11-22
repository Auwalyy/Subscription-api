import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import {
  createSubscription,
  getUserSubscriptions,
  getUpcomingRenewals
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// GET subscriptions for a specific user
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// GET upcoming renewals
subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

// POST create subscription
subscriptionRouter.post('/', authorize, createSubscription);

export default subscriptionRouter;
