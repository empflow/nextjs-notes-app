import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";
import isValidHexColor from "../../../utils/isValidHexColor";

export default async function updateTagValidateColor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { color } = req.body;

  if (!color) return next();

  if (!isValidHexColor(color)) {
    throw new BadRequestErr("Invalid hex color");
  }

  next();
}
