import { z } from "zod";

export const viewMediaFileRespSchema = z.object({
  url: z.string(),
  placeholderImgBase64: z.string(),
});
export type TViewMediaFileRespSchema = z.infer<typeof viewMediaFileRespSchema>;
