import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import { SignUpOrInResponse } from "../../types";

export default async function signIn(req: Request, res: Response) {
  const user: IUser = res.locals.user;

  const accessToken = user.getAccessToken();
  const { forDb: refreshTokenForDb, plainTextToken: plainTextRefreshToken } =
    await user.getRefreshToken();

  const { id } = await RefreshToken.create(refreshTokenForDb);
  const response: SignUpOrInResponse = {
    accessToken,
    refreshToken: {
      id,
      token: plainTextRefreshToken,
    },
    username: user.email,
  };
  res.status(200).json(response);
}
