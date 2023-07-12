import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../utils/errs";

export default async function checkPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  if (!password) {
    throw new BadRequestErr("Password not provided");
  }

  if (typeof password !== "string") {
    throw new BadRequestErr("Password must be a string");
  }

  next();
}
