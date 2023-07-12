import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { BadRequestErr } from "../../../utils/errs";

export default async function signOutCheckHashAndPlainTextTokensMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    refreshToken: { token: tokenPlainText },
  } = req.body;
  const { foundTokenObj } = res.locals;

  const hashAndPlainTextTokensMatch = await bcrypt.compare(
    tokenPlainText,
    foundTokenObj.tokenHash
  );
  if (!hashAndPlainTextTokensMatch) throw new BadRequestErr("Wrong token");

  next();
}
