import { Request, Response } from "express";
import Note from "../../models/Note";
import { NotFoundErr } from "../../utils/errs";

export default async function getNote(req: Request, res: Response) {
  const { noteId } = req.params;
  const userId = res.locals.jwtPayload.userId;
  const note = await Note.findOne({ owner: userId, _id: noteId });
  if (!note) throw new NotFoundErr("Note not found");
  res.status(200).json(note);
}
