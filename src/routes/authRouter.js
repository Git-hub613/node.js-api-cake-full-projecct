import express from 'express';
import { login, logout, register, forgetPassword, resetPassword } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login',login)
authRouter.post('/register',register) 
authRouter.get('/logout',logout)
authRouter.post('/forget-password',forgetPassword)            
authRouter.post('/reset-password/:userId',resetPassword)            

export default authRouter;