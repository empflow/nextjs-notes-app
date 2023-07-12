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
import checkRefreshToken from "../middleware/auth/checkRefreshToken";
import signOutCheckHashAndPlainTextTokensMatch from "../middleware/auth/signOut/checkHashAndPlainTextTokensMatch";
import checkRefreshTokenExistsInDb from "../middleware/auth/checkRefreshTokenExistsInDb";
import getNewTokens from "../controllers/auth/getNewTokens";
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
  checkRefreshToken,
  checkRefreshTokenExistsInDb,
  signOutCheckHashAndPlainTextTokensMatch,
  signOut
);

router.post(
  "/get-new-tokens",
  checkRefreshToken,
  checkRefreshTokenExistsInDb,
  getNewTokens
);

export default router;
