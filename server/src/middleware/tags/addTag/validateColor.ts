import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";

export default async function addTagValidateColor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { color } = req.body;
  const hexColorRegex = /^#[0-9A-F]{6}$/i;

  const isValidHexColor = hexColorRegex.test(color);
  if (!isValidHexColor) {
    throw new BadRequestErr("Invalid hex color");
  }

  next();
}
