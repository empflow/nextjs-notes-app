import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { BadRequestErr } from "../../utils/errs";
import ErrCode from "../../utils/errCodes";

export default async function checkHashAndPlainTextTokensMatch(
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
  if (!hashAndPlainTextTokensMatch)
    throw new BadRequestErr("Wrong token", ErrCode.INVALID_REFRESH_TOKEN);

  next();
}
