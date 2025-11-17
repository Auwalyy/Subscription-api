import { Router } from 'express';

const subscriptionRouter = Router();

// GET all subscriptions - should come before dynamic routes
subscriptionRouter.get('/', (req, res) => res.send({ title: "GET all subscriptions" }));

// GET upcoming renewals - specific route before dynamic routes
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: `GET all upcoming renewals` }));

// GET subscriptions for a specific user
subscriptionRouter.get('/user/:userId', (req, res) => res.send({ title: `GET subscriptions for user ${req.params.userId}` }));

// POST create new subscription
subscriptionRouter.post('/', (req, res) => res.send({ title: "Create a new subscription" }));

// GET subscription by ID
subscriptionRouter.get('/:id', (req, res) => res.send({ title: `GET subscription details for ${req.params.id}` }));

// PUT update subscription
subscriptionRouter.put('/:id', (req, res) => res.send({ title: `Update subscription details for ${req.params.id}` }));

// DELETE subscription
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: `Delete subscription ${req.params.id}` }));

// POST cancel subscription
subscriptionRouter.post('/:id/cancel', (req, res) => res.send({ title: `Cancel subscription ${req.params.id}` }));

export default subscriptionRouter;