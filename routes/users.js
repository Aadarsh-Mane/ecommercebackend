import express from 'express';
import { getUserById, getUsers, updateUser } from '../controllers/users.js';

const userRouter =express.Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',getUserById);
userRouter.put('/:id',updateUser);

export default userRouter
