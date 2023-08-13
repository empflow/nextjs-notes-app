import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../../utils/errs";

export default async function checkTagId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tagId } = req.params;

  if (!isValidObjectId(tagId)) {
    throw new BadRequestErr("Invalid tag id");
  }

  next();
}
