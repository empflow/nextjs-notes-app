import { Request, Response } from "express";
import Note from "../../models/Note";
import noteMetaProjection from "../../utils/projections/noteMeta";

export default async function getNotesMeta(req: Request, res: Response) {
  const userId: string = res.locals.jwtPayload.userId;
  const notes = await Note.find({ owner: userId }, noteMetaProjection);
  res.status(200).json(notes);
}
