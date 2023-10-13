import { z } from "zod";
import { authRespSchema } from "./auth";

export const getNewTokensRespSchema = authRespSchema.extend({
  username: z.string().optional(),
});
export type TGetNewTokensResp = z.infer<typeof getNewTokensRespSchema>;
