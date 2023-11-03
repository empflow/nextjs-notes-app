import { TNoteMetaSchema, TNoteSchema } from "@shared/schemas/note";

export function convertNoteToNoteMeta(note: TNoteSchema): TNoteMetaSchema {
  const { content: _, ...noteMeta } = note;
  return noteMeta;
}
