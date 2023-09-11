import { NextFunction, Request, Response } from "express";
import { errMsgs } from "../../../config/globalVars";
import { BadRequestErr } from "../../../utils/errs";
import throwIfInvalidObjectId from "../../../utils/throwers/throwIfInvalidObjectId";

export default async function validateUpdateNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { noteId } = req.params;
  throwIfInvalidObjectId(noteId, { msg: errMsgs.noteInvalidId });
  throwIfNoNewDataProvided(req);
  next();
}

function throwIfNoNewDataProvided(req: Request) {
  const updatableFields = ["title", "content", "isInTrash", "tags"];
  for (const providedField in req.body) {
    if (updatableFields.includes(providedField)) return;
  }
  throw new BadRequestErr("No new data provided");
}
