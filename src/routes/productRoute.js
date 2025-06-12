import express from 'express';
import { categoies, createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';
import auth from '../middlewares/authMiddlewares.js';
import { authBased } from '../middlewares/authBase.js';
import {ROLES_USER,ROLES_MERCHANT,ROLES_ADMIN} from '../constant/roles.js'

const router = express()

router.get("/",auth,authBased(ROLES_USER),getProducts)

router.get("/:id",auth,authBased(ROLES_USER),getProductById)

router.post("/",auth,authBased(ROLES_MERCHANT),createProduct )

router.put("/:id",auth,authBased(ROLES_MERCHANT),updateProduct)

router.delete("/:id",auth,authBased(ROLES_ADMIN),deleteProduct)

router.get("/category/name",auth,categoies)


export default router;