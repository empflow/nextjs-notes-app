import { Request, Response } from "express";
import Note from "../../models/Note";

export default async function addNote(req: Request, res: Response) {
  const userId = res.locals.jwtPayload.userId;
  const { title, content, tags } = req.body;
  const note = await Note.create({ owner: userId, title, tags, content });
  res.status(201).json(note);
}
