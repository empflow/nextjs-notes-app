import { NextFunction, Request, Response } from "express";
import User from "../../../models/User";
import { NotFoundErr } from "../../../utils/errs";

export default async function signInCheckUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundErr("User not found");
  res.locals.user = user;
  next();
}
