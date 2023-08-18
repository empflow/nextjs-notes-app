import { TRefreshTokenForClient } from "@server/utils/types";

export interface TAuthResp {
  accessToken: string;
  refreshToken: TRefreshTokenForClient;
  username: string;
}

export const enum TErrCode {
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
  NO_ACCESS_TOKEN = "NO_ACCESS_TOKEN",
  NO_REFRESH_TOKEN = "NO_REFRESH_TOKEN",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  ACCESS_DENIED = "ACCESS_DENIED",
  OLD_REFRESH_TOKEN_NOT_FOUND = "OLD_REFRESH_TOKEN_NOT_FOUND",
}
