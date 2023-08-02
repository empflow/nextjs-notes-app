import { Request, Response } from "express";
import RefreshToken from "../../models/RefreshToken";
import { NotFoundErr } from "../../utils/errs";

export default async function signOut(req: Request, res: Response) {
  const {
    refreshToken: { id: tokenId },
  } = req.body;

  const deletedToken = await RefreshToken.findByIdAndDelete(tokenId);
  if (!deletedToken) throw new NotFoundErr("Token not found");

  res.status(200).json({ ok: true });
}
