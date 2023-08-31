import { z } from "zod";

export const enum TErrCode {
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
  NO_ACCESS_TOKEN = "NO_ACCESS_TOKEN",
  NO_REFRESH_TOKEN = "NO_REFRESH_TOKEN",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  WRONG_PASSWORD = "WRONG_PASSWORD",
  ACCESS_DENIED = "ACCESS_DENIED",
  OLD_REFRESH_TOKEN_NOT_FOUND = "OLD_REFRESH_TOKEN_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USERNAME_TAKEN = "USERNAME_TAKEN",
  PASSWORD_TOO_WEAK = "PASSWORD_TOO_WEAK",
}

export const authRespSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.object({
    id: z.string(),
    token: z.string(),
  }),
  username: z.string(),
});
export type TAuthResp = z.infer<typeof authRespSchema>;

export const isUsernameAvailableRespSchema = z.object({
  ok: z.boolean(),
});
export type TIsUsernameAvailableResp = z.infer<
  typeof isUsernameAvailableRespSchema
>;
