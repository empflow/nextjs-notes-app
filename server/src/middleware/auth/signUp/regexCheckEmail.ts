import { Request, Response, NextFunction } from "express";
import { emailRegex } from "../../../../../shared/regexes";
import { BadRequestErr } from "../../../utils/errs";

export default async function signUpRegexCheckEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  if (!emailRegex.test(email)) {
    throw new BadRequestErr("Invalid email address");
  }

  next();
}
