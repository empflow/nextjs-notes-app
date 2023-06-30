import { Request, Response } from "express";
import Note from "../../models/Note";
import { NotFoundErr } from "../../utils/errs";

export default async function deleteNote(req: Request, res: Response) {
  const { noteId } = req.params;
  const userId = res.locals.jwtPayload.userId;
  const noteDeletionResult = await Note.deleteOne({
    owner: userId,
    _id: noteId,
  });
  if (!noteDeletionResult.deletedCount) throw new NotFoundErr("Note not found");
  res.status(200).json({ ok: true });
}
