import { z } from "zod";
import noteContent from "../localUtils/noteContent";
import timestamps from "../localUtils/timestamps";

export const noteSchemaBase = z.object({
  title: z.string().nullable(),
  content: noteContent.nullable(),
  description: z.string().nullable(),
  isInTrash: z.boolean(),
  _id: z.string(),
});

export const noteSchema = noteSchemaBase.extend({
  owner: z.string(),
  tags: z.string().array(),
  ...timestamps,
});

export const noteMetaSchema = noteSchema.extend({
  content: z.undefined(),
});

export type TNoteSchemaBase = z.infer<typeof noteSchemaBase>;
export type TNoteSchema = z.infer<typeof noteSchema>;
export type TNoteMetaSchema = z.infer<typeof noteMetaSchema>;
