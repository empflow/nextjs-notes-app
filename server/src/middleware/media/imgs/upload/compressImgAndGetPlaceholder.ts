import getImgCompressionQuality from "@/server/src/utils/getImgCompressionQuality";
import { getPlaceholderImgBase64 } from "@/server/src/utils/getPlaceholderImgBase64";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";

export default async function uploadImgCompressImgAndGetPlaceholder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { buffer } = req.file as Express.Multer.File;
  const quality = getImgCompressionQuality(buffer);

  const compressedImgPromise = sharp(buffer)
    .webp({ quality, alphaQuality: 75 })
    .toBuffer();

  const placeholderImgBase64Promise = getPlaceholderImgBase64(buffer);

  const [compressedImg, { base64: placeholderImgBase64 }] = await Promise.all([
    compressedImgPromise,
    placeholderImgBase64Promise,
  ]);

  res.locals.img = {
    compressed: compressedImg,
    placeholderBase64: placeholderImgBase64,
    filename: req.file?.originalname,
  };

  next();
}
