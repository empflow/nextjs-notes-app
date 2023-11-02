import { Request, Response } from "express";
import Note from "../../models/Note";
import noteMetaProjection from "../../utils/projections/noteMeta";

export default async function getNotesMeta(req: Request, res: Response) {
  const {
    query: { tag },
  } = res.locals;
  const userId: string = res.locals.jwtPayload.userId;

  const tagQuery: Partial<{ tags: string }> = {};
  if (tag) tagQuery.tags = tag;

  const notes = await Note.find(
    { owner: userId, ...tagQuery },
    noteMetaProjection
  );
  res.status(200).json(notes);
}
