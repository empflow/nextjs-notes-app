import { Request, Response } from "express";
import RefreshToken from "../../models/RefreshToken";
import { IUser } from "../../models/User";
import { SignUpOrInResponse } from "../../types";
import InternalServerErr from "../../utils/errs/InternalServerErr";

export default async function getNewTokens(req: Request, res: Response) {
  const { user }: { user: IUser } = res.locals as any;
  const {
    refreshToken: { id: oldRefreshTokenId },
  }: { refreshToken: { id: string } } = req.body;

  const newRefreshToken = await user.getRefreshToken();
  const newAccessToken = user.getAccessToken();

  const deletedOldRefreshToken = await RefreshToken.findByIdAndDelete(
    oldRefreshTokenId
  );
  if (!deletedOldRefreshToken) {
    throw new InternalServerErr("Could not delete old refresh token");
  }

  const savedNewRefreshToken = await RefreshToken.create(newRefreshToken.forDb);

  const response = {
    accessToken: newAccessToken,
    refreshToken: {
      id: savedNewRefreshToken.id,
      token: newRefreshToken.plainTextToken,
    },
  };
  res.status(200).json(response);
}
