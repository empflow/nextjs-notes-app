import { Request, Response } from "express";
import User from "../../models/User";
import RefreshToken from "../../models/RefreshToken";
import { SignUpOrInResponse } from "../../types";

export default async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.create({ email, password });

  const accessToken = user.getAccessToken();
  const { forDb: refreshTokenForDb, plainTextToken: plainTextRefreshToken } = await user.getRefreshToken();

  const { id } = await RefreshToken.create(refreshTokenForDb);
  const response: SignUpOrInResponse = {
    accessToken, refreshToken: {
      id, token: plainTextRefreshToken
    }
  }
  res.json(response);
}

