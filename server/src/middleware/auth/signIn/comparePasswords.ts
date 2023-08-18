import { Request, Response, NextFunction } from "express";
import { TErrCode } from "@shared/types";
import { UnauthorizedErr } from "../../../utils/errs";

export default async function signInComparePasswords(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = res.locals;
  const { password } = req.body;

  const doPasswordsMatch = await user.doPasswordsMatch(password);
  if (!doPasswordsMatch) {
    throw new UnauthorizedErr("Wrong password", TErrCode.INVALID_CREDENTIALS);
  }

  next();
}
