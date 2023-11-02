import { z } from "zod";

export const booleanRespSchema = z.object({
  ok: z.boolean(),
});
export type TBooleanResp = z.infer<typeof booleanRespSchema>;
