import express from "express";

import { authmiddleware } from "../middleware/auth.js";
import { signup, login, getusers } from "../controller/usercontroller.js";

const router = express.Router();
router.get('/',authmiddleware,getusers)
router.post("/signup", signup);
router.post("/login", login);


export default router;
