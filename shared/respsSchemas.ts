import { z } from "zod";
import { noteSchema } from "./schemas";

export const authRespSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.object({
    id: z.string(),
    token: z.string(),
  }),
  username: z.string(),
});
export type TAuthResp = z.infer<typeof authRespSchema>;

export const getNewTokensRespSchema = authRespSchema.extend({
  username: z.undefined(),
});
export type TGetNewTokensResp = z.infer<typeof getNewTokensRespSchema>;

export const isUsernameAvailableRespSchema = z.object({
  ok: z.boolean(),
});
export type TIsUsernameAvailableResp = z.infer<
  typeof isUsernameAvailableRespSchema
>;

export const signOutRespSchema = z.object({
  ok: z.boolean(),
});
export type TSignOutRespSchema = z.infer<typeof signOutRespSchema>;

export const noteRespSchema = z.nullable(noteSchema);
