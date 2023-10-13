import { z } from "zod";

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
