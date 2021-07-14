import express from "express";
import { isAdmin, isAuth, requireSignin } from "../controllers/auth";
import { create, list, productById, read, remove, update } from "../controllers/products";
import { userById } from "../controllers/user";

const router = express.Router();

router.get('/product/:productId', read);
router.get('/')
router.post("/products/:userId/create", requireSignin, isAuth, isAdmin, create);
router.get("/products", list);
router.param("productId", productById);
router.delete("/product/:userId/:productId",requireSignin, isAuth, isAdmin, remove)
router.put("/product/:userId/:productId", requireSignin, isAuth, isAdmin, update)
router.param('userId', userById)

module.exports = router;
