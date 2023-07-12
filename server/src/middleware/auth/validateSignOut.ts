import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import isRefreshTokenObjectStrctureValid from "../../utils/isRefreshTokenObjectStrctureValid";
import RefreshToken from "../../models/RefreshToken";
import { BadRequestErr, NotFoundErr } from "../../utils/errs";
import { Document } from "mongoose";
import { RefreshTokenForDb } from "../../types";

export default async function validateSignOut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;
  if (!isRefreshTokenObjectStrctureValid(refreshToken)) {
    throw new BadRequestErr(
      "Invalid refresh token. Refresh tokens must be of type { token: string, id: string }"
    );
  }

  const { token: givenPlainTextToken, id: tokenId } = refreshToken;
  const tokenObj = await RefreshToken.findById(tokenId);
  if (!tokenObj) {
    const msg = `No refresh token with such id`;
    throw new NotFoundErr(msg);
  }

  const tokensMatch = await bcrypt.compare(
    givenPlainTextToken,
    (tokenObj as any).tokenHash
  );
  if (!tokensMatch) throw new BadRequestErr("Tokens do not match");

  console.log(tokenId);
  res.locals.tokenId = tokenId;
  next();
}
