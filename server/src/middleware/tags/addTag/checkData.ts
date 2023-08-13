import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";

export default async function addTagCheckDataPresense(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, color } = req.body;

  if (!name) throw new BadRequestErr("No tag name provided");
  if (!color) throw new BadRequestErr("No tag color provided");

  next();
}
