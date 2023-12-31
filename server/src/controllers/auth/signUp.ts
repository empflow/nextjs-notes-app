import { Request, Response } from "express";
import User from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import { TAuthResp } from "@/shared/respSchemas/auth";

export default async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.create({ email, password });

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
  res.json(response);
}
