import { Request, Response, NextFunction } from "express";
import verifyJwt from "../../../utils/verifyJwt";

export default async function getNewTokensJwtVerifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    refreshToken: { token: tokenPlainText },
  } = req.body;

  const payload = verifyJwt(tokenPlainText, "JWT_REFRESH_TOKEN_SECRET", {
    errMsg: "Invalid jwt refresh token",
    jwtExpiredErrMsg: "Jwt refresh token expired",
  });

  res.locals.refreshTokenPayload = payload;

  next();
}
