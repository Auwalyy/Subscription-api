import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// GET all subscriptions - should come before dynamic routes
subscriptionRouter.get('/', (req, res) => res.send({ title: "GET all subscriptions" }));

// GET upcoming renewals - specific route before dynamic routes
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: `GET all upcoming renewals` }));

// GET subscriptions for a specific user
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// POST create new subscription
subscriptionRouter.post('/', authorize, createSubscription)
// GET subscription by ID
subscriptionRouter.get('/:id', (req, res) => res.send({ title: `GET subscription details for ${req.params.id}` }));

// PUT update subscription
subscriptionRouter.put('/:id', (req, res) => res.send({ title: `Update subscription details for ${req.params.id}` }));

// DELETE subscription
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: `Delete subscription ${req.params.id}` }));

// POST cancel subscription
subscriptionRouter.post('/:id/cancel', (req, res) => res.send({ title: `Cancel subscription ${req.params.id}` }));

export default subscriptionRouter;