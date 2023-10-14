import s3Upload from "@/server/src/utils/files/s3Upload";
import { Request, Response, NextFunction } from "express";

export default async function uploadImgUploadCompressedImg(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { img } = res.locals;

  const compressedImgUpload = await s3Upload(img.compressed, {
    ext: "webp",
    filename: img.filename,
  });

  res.locals.compressedImgUpload = compressedImgUpload;
  next();
}
