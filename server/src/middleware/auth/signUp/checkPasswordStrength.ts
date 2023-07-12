import { Request, Response, NextFunction } from "express";
import doesStrIncludeNumbers from "../../../utils/doesStrIncludeNumbers";
import doesStrIncludeSpecialChars from "../../../utils/doesStrIncludeSpecialChars";
import { BadRequestErr } from "../../../utils/errs";

export default async function signUpCheckPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;

  if (password.length < 10) {
    const msg = "Password is too short. Must be 10 or more characters";
    throw new BadRequestErr(msg);
  }
  if (!doesStrIncludeNumbers(password)) {
    const msg = "Password must include at least 1 number";
    throw new BadRequestErr(msg);
  }
  if (!doesStrIncludeSpecialChars(password)) {
    const msg =
      "Password must include at least 1 special character ('$', '_', '*', '^', etc)";
    throw new BadRequestErr(msg);
  }

  next();
}
