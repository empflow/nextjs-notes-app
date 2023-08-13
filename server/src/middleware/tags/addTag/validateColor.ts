import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";
import isValidHexColor from "../../../utils/isValidHexColor";

export default async function addTagValidateColor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { color } = req.body;

  if (!isValidHexColor(color)) {
    throw new BadRequestErr("Invalid hex color");
  }

  next();
}
