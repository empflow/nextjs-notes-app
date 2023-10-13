import { z } from "zod";

export const authRespSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.object({
    id: z.string(),
    token: z.string(),
  }),
  username: z.string(),
});
export type TAuthResp = z.infer<typeof authRespSchema>;
