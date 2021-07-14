import express from "express";
import { isAdmin, isAuth, requireSignin } from "../controllers/auth";
import {
  create,
  list,
  read,
  categoryById,
  remove,
  update,
} from "../controllers/categories";
import { userById } from "../controllers/user";
const router = express.Router();

router.get("/category/:categoryId", read);
router.post(
  "/categories/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.get("/categories", list);
router.param("categoryId", categoryById);
router.delete(
  "/category/:userId/:categoryId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/category/:userId/:categoryId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.param("userId", userById);

module.exports = router;
