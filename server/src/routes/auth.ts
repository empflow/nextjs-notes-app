import express from "express";
import signUp from "../controllers/auth/signUp";
import signIn from "../controllers/auth/signIn";
import signOut from "../controllers/auth/signOut";
import signInCheckUser from "../middleware/auth/signIn/checkUser";
import signInComparePasswords from "../middleware/auth/signIn/comparePasswords";
import checkEmail from "../middleware/auth/checkEmail";
import checkPassword from "../middleware/auth/checkPassword";
import signUpRegexCheckEmail from "../middleware/auth/signUp/regexCheckEmail";
import signUpCheckPasswordStrength from "../middleware/auth/signUp/checkPasswordStrength";
import signUpCheckDuplicateEmail from "../middleware/auth/signUp/checkDuplicateEmail";
import signOutCheckRefreshToken from "../middleware/auth/signOut/checkRefreshToken";
import signOutCheckHashAndPlainTextTokensMatch from "../middleware/auth/signOut/checkHashAndPlainTextTokensMatch";
import signOutCheckRefreshTokenExistsInDb from "../middleware/auth/signOut/checkRefreshTokenExistsInDb";
const router = express.Router();

router.post(
  "/sign-up",
  checkEmail,
  checkPassword,
  signUpRegexCheckEmail,
  signUpCheckPasswordStrength,
  signUpCheckDuplicateEmail,
  signUp
);
router.post(
  "/sign-in",
  checkEmail,
  checkPassword,
  signInCheckUser,
  signInComparePasswords,
  signIn
);
router.post(
  "/sign-out",
  signOutCheckRefreshToken,
  signOutCheckRefreshTokenExistsInDb,
  signOutCheckHashAndPlainTextTokensMatch,
  signOut
);

export default router;
