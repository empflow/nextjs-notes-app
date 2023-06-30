import { NextFunction, Request, Response } from "express";

export default async function validateAddNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, content } = req.body;
  if (!title || !content) res.status(400);
  if (!title) res.json({ message: "Note title not provided" });
  if (!content) res.json({ message: "Note content not provided" });

  next();
}
