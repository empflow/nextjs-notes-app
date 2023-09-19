import { Request, Response } from "express";
import Note from "../../models/Note";
import { JSONContent } from "@tiptap/react";

export default async function addNote(req: Request, res: Response) {
  const { content, tags } = req.body;
  const { description, title } = res.locals;
  const userId = res.locals.jwtPayload.userId;

  const note = await Note.create({
    owner: userId,
    title,
    tags,
    content: content ?? getInitContent(),
    description,
  });
  res.status(201).json(note);
}

function getInitContent(): JSONContent {
  return {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
      },
    ],
  };
}
