import { z } from "zod";
import timestamps from "../localUtils/timestamps";

export const mediaFileSchemaBase = z.object({
  url: z.string(),
  placeholderImgBase64: z.string().nullable(),
  _id: z.string(),
  key: z.string(),
});

export const mediaFileSchema = mediaFileSchemaBase.extend({
  owner: z.string(),
  ...timestamps,
});

export type TMediaFileSchemaBase = z.infer<typeof mediaFileSchemaBase>;
export type TMediaFileSchema = z.infer<typeof mediaFileSchema>;
