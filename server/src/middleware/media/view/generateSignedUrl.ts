import { s3, s3Credentials } from "@/server/src/utils/files/s3";
import { Request, Response, NextFunction } from "express";

export default async function viewMediaFileGenerateSignedUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mediaFile } = res.locals;

  const operation = "getObject";
  // this isn't type-safe and it sucks
  const signedUrl = await s3.getSignedUrlPromise(operation, {
    Key: mediaFile.key,
    Expires: 10,
    Bucket: s3Credentials.bucketName,
  });

  res.locals.signedUrl = signedUrl;
  next();
}
