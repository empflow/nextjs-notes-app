import { Request, Response } from "express";
import RefreshToken from "../../models/RefreshToken";
import { TUser } from "../../models/User";

export default async function getNewTokens(req: Request, res: Response) {
  const { user }: { user: TUser } = res.locals as any;
  const {
    refreshToken: { id: oldRefreshTokenId },
  }: { refreshToken: { id: string } } = req.body;

  const newRefreshToken = await user.getRefreshToken();
  const newAccessToken = user.getAccessToken();

  deleteOldRefreshTokenFromDbAfterDelay(oldRefreshTokenId);

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

function deleteOldRefreshTokenFromDbAfterDelay(oldRefreshTokenId: string) {
  new Promise((resolve) => {
    setTimeout(async () => {
      try {
        await RefreshToken.findByIdAndDelete(oldRefreshTokenId);
      } catch (err) {}
      resolve({});
    }, 5000);
  });
}
