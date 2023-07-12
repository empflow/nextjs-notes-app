import { Request, Response, NextFunction } from "express";
import RefreshToken from "../../models/RefreshToken";
import { NotFoundErr } from "../../utils/errs";

export default async function checkRefreshTokenExistsInDb(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    refreshToken: { id: tokenId },
  } = req.body;

  const foundTokenObj = await RefreshToken.findById(tokenId);
  if (!foundTokenObj) {
    throw new NotFoundErr(`No refresh token with such id`);
  }

  res.locals.foundTokenObj = foundTokenObj;
  next();
}
