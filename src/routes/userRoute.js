import express from 'express';
import { country,createMerchant, createUser, getAllMerchant, merchantDelete, updateMerchant} from '../controllers/userController.js';
import auth from '../middlewares/authMiddlewares.js';
import {authBased} from '../middlewares/authBase.js';
import { ROLES_ADMIN,} from '../constant/roles.js';

const userRouter = express.Router();

userRouter.post('/user/login',createUser);
userRouter.get('/user/country',country);
userRouter.post("/user/merchant",auth,authBased(ROLES_ADMIN),createMerchant)
userRouter.put("/user/:id",auth,authBased(ROLES_ADMIN),updateMerchant)
userRouter.delete("/user/:id",auth,authBased(ROLES_ADMIN),merchantDelete)
userRouter.get("/user",auth,getAllMerchant)

export default userRouter;
