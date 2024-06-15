import express from 'express';
import user from '../models/user';

const userRouter =express.Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',getUserById);
userRouter.put('/:id',updateUser);

