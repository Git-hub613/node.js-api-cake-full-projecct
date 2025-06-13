import express from 'express';
import { brands, categoies, category, createProduct, deleteProduct, getProductById, getProducts, getUserAll, updateProduct } from '../controllers/productController.js';
import auth from '../middlewares/authMiddlewares.js';
import { authBased } from '../middlewares/authBase.js';
import {ROLES_USER,ROLES_MERCHANT,ROLES_ADMIN} from '../constant/roles.js'

const router = express()

router.get("/",getProducts)
router.get("/user",auth,getUserAll)
router.get("/:id",auth,authBased(ROLES_MERCHANT),getProductById)

router.post("/",auth,authBased(ROLES_MERCHANT),createProduct )

router.put("/:id",auth,authBased(ROLES_MERCHANT),updateProduct)

router.delete("/:id",auth,authBased(ROLES_ADMIN),deleteProduct)

router.get("/category/name",auth,categoies)

router.get("/category/:category",category)
router.get("/brands/:brands",brands)


export default router;