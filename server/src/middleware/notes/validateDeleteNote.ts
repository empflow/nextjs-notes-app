import { NextFunction, Request, Response } from "express";
import { errMsgs } from "../../config/globalVars";
import throwIfInvalidObjectId from "../../utils/throwers/throwIfInvalidObjectId";

export default async function validateDeleteNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { noteId } = req.params;
  throwIfInvalidObjectId(noteId, { msg: errMsgs.noteInvalidId });
  next();
}
