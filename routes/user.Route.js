import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middleware/auth.middleware.js';


const userRouter = Router();


// GET /users 
userRouter.get('/users', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({ title: "Create a new user"}));

userRouter.put('/:id', (req, res) => res.send({ title: `Update user details`}))
;
userRouter.delete('/:id', (req, res) => res.send({ title: `Delete a user`}));

export default userRouter;