import express from "express";
import signUp from "../controllers/auth/signUp";
import validateSignUp from "../middleware/auth/validateSignUp";
import validateSignIn from "../middleware/auth/validateSignIn";
import signIn from "../controllers/auth/signIn";
import signOut from "../controllers/auth/signOut";
import validateSignOut from "../middleware/auth/validateSignOut";
const router = express.Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);
router.post("/sign-out", validateSignOut, signOut);

export default router;
