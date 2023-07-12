import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { RefreshTokenForClient } from "../../../types";
import { BadRequestErr } from "../../../utils/errs";

export default async function signOutCheckRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new BadRequestErr("No refresh token provided");

  if (
    typeof refreshToken.token !== "string" ||
    typeof refreshToken.id !== "string"
  ) {
    const msg = "Refresh token must be of type { id: string, token: string }";
    throw new BadRequestErr(msg);
  }

  const isTokenIdValid = isValidObjectId(refreshToken.id);
  if (!isTokenIdValid) throw new BadRequestErr("Invalid token id");

  next();
}
