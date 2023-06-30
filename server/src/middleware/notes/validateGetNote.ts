import { NextFunction, Request, Response } from "express";
import throwIfInvalidObjectId from "../../utils/throwers/throwIfInvalidObjectId";

export default async function validateGetNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { noteId } = req.params;
  throwIfInvalidObjectId(noteId, { msg: "Invalid note id" });
  next();
}
