import { Request, Response, NextFunction } from "express";
import RefreshToken from "../../models/RefreshToken";
import { TErrCode } from "@/shared/types";
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
    throw new NotFoundErr(
      `No refresh token with such id`,
      TErrCode.OLD_REFRESH_TOKEN_NOT_FOUND
    );
  }

  res.locals.foundTokenObj = foundTokenObj;
  next();
}
