import { Request, Response, NextFunction } from "express";
import throwIfInvalidObjectId from "../../utils/throwers/throwIfInvalidObjectId";

export default async function checkNoteIdParam(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { noteId } = req.params;
  throwIfInvalidObjectId(noteId, { msg: "Invalid note id" });
  next();
}
