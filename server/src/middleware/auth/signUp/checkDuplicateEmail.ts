import { Request, Response, NextFunction } from "express";
import User from "../../../models/User";
import { ConflictErr } from "../../../utils/errs";

export default async function signUpCheckDuplicateEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const userWithSameEmail = await User.findOne({ email });

  if (userWithSameEmail) {
    const msg = "A user with this email already exists";
    throw new ConflictErr(msg);
  }

  next();
}
