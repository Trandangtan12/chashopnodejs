import express from "express";
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { userById, read, update, remove } from "../controllers/user";
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.delete("/user/:userId", requireSignin, remove);

router.param("userId", userById);
module.exports = router;
