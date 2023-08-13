import { Request, Response, NextFunction } from "express";
import verifyRefreshTokenJwt from "../../../utils/verifyRefreshTokenJwt";

export default async function getNewTokensJwtVerifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    refreshToken: { token: tokenPlainText },
  } = req.body;

  const payload = verifyRefreshTokenJwt(
    tokenPlainText,
    "REFRESH_TOKEN_SECRET",
    {
      errMsg: "Invalid jwt refresh token",
      jwtExpiredErrMsg: "Jwt refresh token expired",
    }
  );

  res.locals.refreshTokenPayload = payload;

  next();
}
