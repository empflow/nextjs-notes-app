import { Request, Response } from "express";
import User, { TUser } from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import { TAuthResp } from "@shared/respsSchemas";

export default async function signIn(req: Request, res: Response) {
  const user: TUser = res.locals.user;

  const accessToken = user.getAccessToken();
  const { forDb: refreshTokenForDb, plainTextToken: plainTextRefreshToken } =
    await user.getRefreshToken();

  const { id: refreshTokenId } = await RefreshToken.create(refreshTokenForDb);
  const response: TAuthResp = {
    accessToken,
    refreshToken: {
      id: refreshTokenId,
      token: plainTextRefreshToken,
    },
    username: user.email,
  };
  res.status(200).json(response);
}
