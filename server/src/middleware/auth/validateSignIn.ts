import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { BadRequestErr, NotFoundErr, UnauthorizedErr } from "../../utils/errs";

export default async function validateSignInData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  throwIfSomeDataNotPresent(req);
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundErr("User not found");
  if (!(await user.doPasswordsMatch(password))) {
    throw new UnauthorizedErr("Passwords do not match");
  }
  res.locals.user = user;
  next();
}

function throwIfSomeDataNotPresent(req: Request) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestErr("Both email and password are required to sign in");
  }
}
