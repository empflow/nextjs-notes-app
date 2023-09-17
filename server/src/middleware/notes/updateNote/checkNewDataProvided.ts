import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../../../utils/errs";

export default async function updateNoteCheckNewDataProvided(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const updatableFields = ["content", "isInTrash", "tags"];

  for (const providedField in req.body) {
    if (updatableFields.includes(providedField)) return next();
  }

  throw new BadRequestErr("No new data provided");
}
