import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../../utils/errs";
import throwIfInvalidRefreshTokenObj from "../../utils/throwers/throwIfInvalidRefreshTokenObj";

export default async function checkRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new BadRequestErr("No refresh token provided");

  throwIfInvalidRefreshTokenObj(refreshToken);

  const isTokenIdValid = isValidObjectId(refreshToken.id);
  if (!isTokenIdValid) throw new BadRequestErr("Invalid token id");

  next();
}
