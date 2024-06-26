import express from 'express';
import { forgotPassword, login, register, resetPassword, verifyPasswordResetOtp, verifyToken } from '../controllers/auth.js';
import { body } from 'express-validator';
const validateUser=[
    body('name').not().isEmpty().withMessage('Please enter name'),
    body('email').isEmail().withMessage('Please enter valid email'),
    body('password').isLength({min:8}).withMessage('Please enter password').isStrongPassword().withMessage('password must contain at least one  lowercase letter'),
    body('phone').isMobilePhone().withMessage('please enter phone number')
]
const authRouter =express.Router();

authRouter.post('/login',login)
authRouter.post('/register',validateUser,register)
authRouter.post('/register',validateUser,verifyToken)
authRouter.post('/forgot-password',forgotPassword)
authRouter.post('/verify-otp',verifyPasswordResetOtp)
authRouter.post('/reset-password',resetPassword)
export default authRouter
