import { Request, Response } from "express";
import Note from "../../models/Note";
import { NotFoundErr } from "../../utils/errs";
import mongoUpdateOpts from "../../utils/mongoUpdateOpts";

export default async function assignTagToNote(req: Request, res: Response) {
  const { tagId } = req.params;
  const { noteId } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId },
    { $addToSet: { tags: tagId } },
    mongoUpdateOpts
  );
  if (!updatedNote) throw new NotFoundErr("Note not found");

  res.status(200).json(updatedNote);
}
