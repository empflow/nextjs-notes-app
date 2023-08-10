import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import ErrCode from "../../utils/errCodes";
import { BadRequestErr } from "../../utils/errs";
import throwIfInvalidRefreshTokenObj from "../../utils/throwers/throwIfInvalidRefreshTokenObj";

export default async function checkRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestErr(
      "No refresh token provided",
      ErrCode.NO_REFRESH_TOKEN
    );
  }

  throwIfInvalidRefreshTokenObj(refreshToken);

  const isTokenIdValid = isValidObjectId(refreshToken.id);
  if (!isTokenIdValid)
    throw new BadRequestErr("Invalid token id", ErrCode.INVALID_REFRESH_TOKEN);

  next();
}
