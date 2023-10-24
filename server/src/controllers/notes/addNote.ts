import { Request, Response } from "express";
import Note from "../../models/Note";
import { initNoteContent } from "@/shared/values";

export default async function addNote(req: Request, res: Response) {
  const { content, tags } = req.body;
  const { description, title } = res.locals;
  const userId = res.locals.jwtPayload.userId;

  const note = await Note.create({
    owner: userId,
    title,
    tags,
    content: content ?? initNoteContent,
    description,
  });
  res.status(201).json(note);
}
