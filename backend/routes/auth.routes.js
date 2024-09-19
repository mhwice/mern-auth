import express from "express";
import { register, login, logout, verifyEmail, getProfile } from "../controllers/auth.controller.js";
import { validate, registerSchema, loginSchema, verifySchema } from "../middleware/user-validation.middleware.js";
import { parseCookies } from "../middleware/cookies.middleware.js ";
import { parseToken } from "../middleware/token.middleware.js ";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
// router.get("/logout", logout);
// router.post("/verify-email", validate(verifySchema), verifyEmail);
router.get("/profile", parseToken, getProfile);

export default router;
