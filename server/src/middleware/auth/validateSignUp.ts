import { Request, Response, NextFunction } from "express";
import { emailRegex } from "../../config/globalVars";
import User from "../../models/User";
import doesStrIncludeNumbers from "../../utils/doesStrIncludeNumbers";
import doesStrIncludeSpecialChars from "../../utils/doesStrIncludeSpecialChars";
import { BadRequestErr, ConflictErr } from "../../utils/errs";

export default async function validateSignUpData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  throwIfSomeDataNotPresent(req);
  throwIfInvalidEmail(email);
  await throwIfBadPassword(password);
  await throwIfDuplicateEmail(email);
  next();
}

async function throwIfBadPassword(password: string) {
  if (password.length < 10)
    throwE("Password too short. Must be 10 or more characters");
  if (!doesStrIncludeNumbers(password))
    throwE("Password must include at least 1 number");
  if (!doesStrIncludeSpecialChars(password))
    throwE(
      "Password must include at least 1 special character ('$', '_', '*', '^', etc)"
    );
}

function throwE(msg: string): never {
  throw new BadRequestErr(msg);
}

async function throwIfDuplicateEmail(email: string) {
  const userWithSameEmail = await User.findOne({ email: email });
  if (userWithSameEmail) {
    const msg = "A user with this email already exists";
    throw new ConflictErr(msg);
  }
}

function throwIfInvalidEmail(email: string) {
  if (!emailRegex.test(email)) {
    throw new BadRequestErr("Invalid email address");
  }
}

function throwIfSomeDataNotPresent(req: Request) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestErr("Both email and password are required to sign up");
  }
}
