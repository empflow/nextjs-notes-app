export interface TAccessTokenPayload {
  userId: string;
}

export interface TRefreshTokenForDb {
  createdAt: number;
  tokenHash: string;
}

export interface TRefreshTokenForClient {
  token: string;
  id: string;
}

export interface TRefreshTokenPayload {
  userId: string;
}
