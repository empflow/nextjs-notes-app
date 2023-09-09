import { z } from "zod";
import { isoDateRegex } from "./regexes";

export const noteSchemaBase = z.object({
  title: z.string(),
  content: z.string(),
  isInTrash: z.boolean(),
  _id: z.string(),
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
export type TNoteMetaSchema = z.infer<typeof noteMetaSchema>;
export type TNoteSchemaBase = z.infer<typeof noteSchemaBase>;
export type TNoteSchema = z.infer<typeof noteSchema>;

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
