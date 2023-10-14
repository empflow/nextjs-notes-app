import MediaFile from "@/server/src/models/MediaFile";
import { ForbiddenErr, NotFoundErr } from "@/server/src/utils/errs";
import { TErrCode } from "@/shared/types";
import { Request, Response, NextFunction } from "express";

export default async function viewMediaFileCheckIsAllowed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    jwtPayload: { userId },
  } = res.locals;
  const { mediaFileId } = req.params;

  const mediaFile = await MediaFile.findOne({ _id: mediaFileId });

  if (!mediaFile) {
    throw new NotFoundErr("Media file not found", TErrCode.NOT_FOUND);
  }

  if (mediaFile.owner.toString() !== userId) {
    throw new ForbiddenErr("Access denied", TErrCode.ACCESS_DENIED);
  }

  next();
}
