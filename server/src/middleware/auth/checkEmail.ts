import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../utils/errs";

export default async function checkEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestErr("Email not provided");
  }

  if (typeof email !== "string") {
    throw new BadRequestErr("Email must be a string");
  }

  next();
}
