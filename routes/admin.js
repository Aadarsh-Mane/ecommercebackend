import express from 'express';
const adminRouter =express.Router();
adminRouter.get('/',getUserCount);
adminRouter.delete('/',deleteUser);
adminRouter.get('/',getUserCount);


export default adminRouter
