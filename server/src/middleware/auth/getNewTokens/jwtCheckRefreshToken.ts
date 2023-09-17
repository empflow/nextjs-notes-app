import { Request, Response, NextFunction } from "express";
import checkRefreshTokenJwt from "../../../utils/checkRefreshTokenJwt";

export default async function getNewTokensJwtCheckRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    refreshToken: { token: tokenPlainText },
  } = req.body;

  const payload = checkRefreshTokenJwt(tokenPlainText, "REFRESH_TOKEN_SECRET", {
    errMsg: "Invalid jwt refresh token",
    jwtExpiredErrMsg: "Jwt refresh token expired",
  });

  res.locals.refreshTokenPayload = payload;

  next();
}
