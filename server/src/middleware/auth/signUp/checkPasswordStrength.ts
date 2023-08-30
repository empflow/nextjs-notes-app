import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";

export default async function signUpCheckPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;

  if (password.length < 8) {
    const msg = "Password is too short. Must be 8 or more characters";
    throw new BadRequestErr(msg);
  }

  next();
}
