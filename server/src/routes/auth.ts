import express from "express";
import signUp from "../controllers/auth/signUp";
import validateSignUpData from "../middleware/auth/validateSignUpData";
import validateSignInData from "../middleware/auth/validateSignInData";
import signIn from "../controllers/auth/signIn";
const router = express.Router();

router.post("/sign-up", validateSignUpData, signUp);
router.post("/sign-in", validateSignInData, signIn);

export default router;
