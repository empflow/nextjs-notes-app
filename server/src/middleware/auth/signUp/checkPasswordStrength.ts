import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";
import { minPasswordLength } from "../../../../../shared/values";
import { TErrCode } from "@shared/types";

export default async function signUpCheckPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;

  if (password.length < minPasswordLength) {
    const msg = `Password is too short. Must be ${minPasswordLength} or more characters`;
    throw new BadRequestErr(msg, TErrCode.PASSWORD_TOO_WEAK);
  }

  next();
}
