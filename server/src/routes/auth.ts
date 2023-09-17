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
import checkHashAndPlainTextTokensMatch from "../middleware/auth/checkHashAndPlainTextTokensMatch";
import checkRefreshTokenExistsInDb from "../middleware/auth/checkRefreshTokenExistsInDb";
import getNewTokens from "../controllers/auth/getNewTokens";
import getNewTokensJwtCheckRefreshToken from "../middleware/auth/getNewTokens/jwtCheckRefreshToken";
import getNewTokensFindUserFromTokenPayload from "../middleware/auth/getNewTokens/findUserFromTokenPayload";
import checkCaptchaToken from "../middleware/checkCaptchaToken";
import checkUsernameAvailability from "../controllers/auth/checkUsernameAvailability";
const router = express.Router();

router.post(
  "/sign-up",
  checkCaptchaToken,
  checkEmail,
  checkPassword,
  signUpRegexCheckEmail,
  signUpCheckPasswordStrength,
  signUpCheckDuplicateEmail,
  signUp
);

router.post(
  "/sign-in",
  checkCaptchaToken,
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
  checkHashAndPlainTextTokensMatch,
  signOut
);

router.post(
  "/get-new-tokens",
  checkRefreshToken,
  checkRefreshTokenExistsInDb,
  checkHashAndPlainTextTokensMatch,
  getNewTokensJwtCheckRefreshToken,
  getNewTokensFindUserFromTokenPayload,
  getNewTokens
);

router.post("/check-username-availability", checkUsernameAvailability);

export default router;
