import { TNoteSchema } from "@shared/schemas";
import { Request, Response, NextFunction } from "express";
import { JSONContent } from "@tiptap/react";

export default async function noteGetTitleAndDescription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { content }: Partial<TNoteSchema> = req.body;
  let title: undefined | null | string = undefined;
  let description: undefined | null | string = undefined;

  if (content) {
    ({ title, description } = findTitleAndDescriptionInContent(content));
  }

  res.locals.description = description;
  res.locals.title = title;
  next();
}

type TFindTitleAndDescriptionInContentReturnT = {
  title: string | null;
  description: string | null;
};
function findTitleAndDescriptionInContent(
  content: JSONContent
): TFindTitleAndDescriptionInContentReturnT {
  let title: string | null = null;
  let description: string | null = null;

  function traverseContent(content: JSONContent) {
    const isDone = !!title && !!description;
    if (isDone) return;

    if (content.text) {
      if (!title) title = content.text.trim();
      else if (!description) description = content.text.trim();
    }

    if (content.content) {
      for (const childContent of content.content) {
        traverseContent(childContent);
      }
    }
  }

  traverseContent(content);
  return { title, description };
}
