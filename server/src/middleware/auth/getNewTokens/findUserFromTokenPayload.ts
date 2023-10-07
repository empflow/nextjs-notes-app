import { Request, Response, NextFunction } from "express";
import User from "../../../models/User";
import { TErrCode } from "@/shared/types";
import { NotFoundErr } from "../../../utils/errs";

export default async function getNewTokensFindUserFromTokenPayload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshTokenPayload: payload } = res.locals;

  const user = await User.findById(payload.userId);
  if (!user)
    throw new NotFoundErr("User not found", TErrCode.INVALID_REFRESH_TOKEN);

  res.locals.user = user;
  next();
}
