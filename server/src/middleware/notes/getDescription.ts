import { TNoteSchema } from "@shared/schemas";
import { Request, Response, NextFunction } from "express";
import { JSONContent } from "@tiptap/react";

export default async function noteGetDescription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { content }: Partial<TNoteSchema> = req.body;
  let description: undefined | null | string = undefined;

  if (content) {
    console.log("content exists:");
    console.log(content);
    description = findFirstLineOfTextInContent(content);
    console.log(`description: ${description}`);
  }

  res.locals.description = description;
  next();
}

function findFirstLineOfTextInContent(content: JSONContent): string | null {
  if (content.text) {
    return content.text;
  }

  if (content.content) {
    for (const innerContent of content.content) {
      const foundContent = findFirstLineOfTextInContent(innerContent);
      if (foundContent) return foundContent;
    }
  }

  return null;
}
