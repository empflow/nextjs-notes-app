import { z } from "zod";
import { isoDateRegex } from "./regexes";

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

export const noteMetaSchema = z.object({
  title: z.string(),
  isInTrash: z.boolean(),
  _id: z.string(),
  owner: z.string(),
  tags: z.string().array(),
  createdAt: z.string().regex(isoDateRegex),
  updatedAt: z.string().regex(isoDateRegex),
});
export type TNoteMetaSchema = z.infer<typeof noteMetaSchema>;

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
export type TNoteSchemaBase = z.infer<typeof noteSchemaBase>;
export type TNoteSchema = z.infer<typeof noteSchema>;
