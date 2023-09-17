import { Request, Response } from "express";
import Note from "../../models/Note";
import { BadRequestErr } from "../../utils/errs";

export default async function addNote(req: Request, res: Response) {
  const { content, tags } = req.body;
  const { description, title, clientId } = res.locals;
  const userId = res.locals.jwtPayload.userId;

  const note = await Note.create({
    owner: userId,
    title,
    tags,
    content,
    description,
    clientId,
  });
  res.status(201).json(note);
}
