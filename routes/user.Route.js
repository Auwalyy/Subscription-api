import { Router } from 'express';

const userRouter = Router();


// GET /users 
userRouter.get('/users', (req, res) => res.send({ title: "GET all users"}));

userRouter.get('/:id', (req, res) => res.send({ title: `GET user details`}));

userRouter.post('/', (req, res) => res.send({ title: "Create a new user"}));

userRouter.put('/:id', (req, res) => res.send({ title: `Update user details`}))
;
userRouter.delete('/:id', (req, res) => res.send({ title: `Delete a user`}));

export default userRouter;