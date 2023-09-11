import { Request, Response } from "express";
import Note from "../../models/Note";
import { NotFoundErr } from "../../utils/errs";

export default async function updateNote(req: Request, res: Response) {
  const { noteId } = req.params;
  const userId = res.locals.jwtPayload.userId;
  const { title, isInTrash, tags, content } = req.body;
  const { description } = res.locals;

  const noteUpdateResult = await Note.updateOne(
    { owner: userId, _id: noteId },
    { title, content, isInTrash, tags, description },
    { new: true, runValidators: true }
  );
  if (!noteUpdateResult.modifiedCount) throw new NotFoundErr("Note not found");
  res.status(200).json({ ok: true });
}
