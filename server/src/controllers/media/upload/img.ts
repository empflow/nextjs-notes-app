import MediaFile from "@/server/src/models/MediaFile";
import { Request, Response } from "express";

export default async function uploadImgCreateMediaFile(
  _req: Request,
  res: Response
) {
  const {
    img: { placeholderBase64: placeholderImgBase64 },
    compressedImgUpload,
    jwtPayload: { userId },
  } = res.locals;

  const mediaFile = await MediaFile.create({
    owner: userId,
    url: compressedImgUpload.Location,
    key: compressedImgUpload.Key,
    placeholderImgBase64,
  });

  res.json(mediaFile);
}
