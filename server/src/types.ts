export interface AccessTokenPayload {
  userId: string
}

export interface RefreshTokenForDb {
  createdAt: number,
  tokenHash: string
}

export interface RefreshTokenForClient {
  token: string,
  id: string
}

export interface RefreshTokenPayload {
  userId: string
}

export interface SignUpOrInResponse {
  accessToken: string,
  refreshToken: RefreshTokenForClient
}
