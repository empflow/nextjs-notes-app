import express from "express";
import signUp from "../controllers/auth/signUp";
import validateSignUp from "../middleware/auth/validateSignUp";
import signInCheckBodyData from "../middleware/auth/signIn/checkBodyData";
import signIn from "../controllers/auth/signIn";
import signOut from "../controllers/auth/signOut";
import validateSignOut from "../middleware/auth/validateSignOut";
import signInCheckUser from "../middleware/auth/signIn/checkUser";
import signInComparePasswords from "../middleware/auth/signIn/comparePasswords";
const router = express.Router();

router.post("/sign-up", validateSignUp, signUp);
router.post(
  "/sign-in",
  signInCheckBodyData,
  signInCheckUser,
  signInComparePasswords,
  signIn
);
router.post("/sign-out", validateSignOut, signOut);

export default router;
