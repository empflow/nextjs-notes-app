import { Request, Response } from "express";
import Note from "../../models/Note";

export default async function getNotesMeta(req: Request, res: Response) {
  const userId: string = res.locals.jwtPayload.userId;
  const notes = await Note.find({ owner: userId });
  if (!notes.length) res.status(404).json({ data: notes });
  res.status(200).json({ data: notes });
}
