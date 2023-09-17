import { z } from "zod";
import { isoDateRegex } from "./regexes";
import { JSONContent as TNoteJsonContent } from "@tiptap/react";

const noteContent: z.ZodType<TNoteJsonContent> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    attrs: z.record(z.unknown()).optional(),
    content: noteContent.array().optional(),
    marks: z
      .object({ type: z.string(), attrs: z.record(z.any()) })
      .array()
      .optional(),
    text: z.string().optional(),
  })
);

export const noteSchemaBase = z.object({
  title: z.string().nullable(),
  content: noteContent.nullable(),
  description: z.string().nullable(),
  isInTrash: z.boolean(),
  _id: z.string(),
  clientId: z.string(),
});
export const noteSchema = noteSchemaBase.extend({
  owner: z.string(),
  tags: z.string().array(),
  createdAt: z.string().regex(isoDateRegex),
  updatedAt: z.string().regex(isoDateRegex),
});
export const noteMetaSchema = noteSchema.extend({
  content: z.undefined(),
});
export type TNoteSchemaBase = z.infer<typeof noteSchemaBase>;
export type TNoteSchema = z.infer<typeof noteSchema>;
export type TNoteMetaSchema = z.infer<typeof noteMetaSchema>;

export const tagSchemaBase = z.object({
  name: z.string(),
  color: z.string(),
  _id: z.string(),
});
export const tagSchema = tagSchemaBase.extend({
  owner: z.string(),
});
export type TTagSchemaBase = z.infer<typeof tagSchemaBase>;
export type TTagSchema = z.infer<typeof tagSchema>;

export const dateSchema = z.date();
