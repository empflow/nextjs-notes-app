import { TNoteSchema } from "@/shared/schemas/note";
import { Request, Response, NextFunction } from "express";
import findNoteTitleAndDescription from "@/shared/utils/findNoteTitleAndDescription";

export default async function noteGetTitleAndDescription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { content }: Partial<TNoteSchema> = req.body;
  let title: undefined | null | string = undefined;
  let description: undefined | null | string = undefined;

  if (content) {
    ({ title, description } = findNoteTitleAndDescription(content));
  }

  res.locals.description = description;
  res.locals.title = title;
  next();
}
