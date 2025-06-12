import express from 'express';
import { checkOutOrder, confirmOrder, createOrder, deleteOrder, getOrderBy, getOrderByUser, getOrderUpdate } from '../controllers/orderController.js';
import auth from '../middlewares/authMiddlewares.js';
import {authBased} from '../middlewares/authBase.js';
import { ROLES_ADMIN } from '../constant/roles.js';

const orderRouter = express.Router()

orderRouter.post("/",auth,createOrder)
orderRouter.get("/",auth,authBased(ROLES_ADMIN),getOrderBy)
orderRouter.get("/order-user",auth,authBased(ROLES_ADMIN),getOrderByUser)
orderRouter.put("/:userId/order-update",auth,authBased(ROLES_ADMIN),getOrderUpdate)
orderRouter.delete("/:id/order-delete",auth,authBased(ROLES_ADMIN),deleteOrder)
orderRouter.put("/:id/check-out",auth,checkOutOrder)
orderRouter.put("/:id/confirm",auth,authBased(ROLES_ADMIN),confirmOrder)

export default orderRouter;