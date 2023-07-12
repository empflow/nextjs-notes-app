import { NextFunction, Request, Response } from "express";
import { BadRequestErr } from "../../../utils/errs";

export default async function signInCheckBodyData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  if (!email) throw new BadRequestErr("Email not provided");
  if (!password) throw new BadRequestErr("Password not provided");

  if (typeof email !== "string") {
    throw new BadRequestErr("Email must be a string");
  }
  if (typeof password !== "string") {
    throw new BadRequestErr("Password must be a string");
  }

  next();
}
