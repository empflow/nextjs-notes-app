import express from "express";
import signUp from "../controllers/auth/signUp";
import validateSignUpData from "../middleware/auth/validateSignUpData";
const router = express.Router();

router.post("/sign-up", validateSignUpData, signUp);

export default router;
