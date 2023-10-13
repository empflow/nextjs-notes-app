import { TErrCode } from "@/shared/types";
import { Request, Response, NextFunction } from "express";
import bToMb from "../../utils/bToMb";
import { BadRequestErr } from "../../utils/errs";

type TArgs = {
  multipleFiles?: boolean;
  maxSizeInMb: number;
};

/**
 * if `multipleFiles` option is set to true, but the multer middleware
 * uses the `.single()` method, this will throw an error even
 * when there is an image provided. This also works the opposite way!
 */
export default function checkFileSize({
  multipleFiles = false,
  maxSizeInMb,
}: TArgs) {
  return function (req: Request, _res: Response, next: NextFunction) {
    const { file, files } = req;

    if (!multipleFiles) {
      if (!file) throw new BadRequestErr("No image provided");
      checkFileSizeExceedsLimit(maxSizeInMb, file);
      return next();
    }

    if (!files?.length) throw new BadRequestErr("No images provided");
    if (!Array.isArray(files)) throw new BadRequestErr("Invalid upload");

    files.forEach((file) => checkFileSizeExceedsLimit(maxSizeInMb, file));
    next();
  };
}

function checkFileSizeExceedsLimit(
  limitInMb: number,
  file: Express.Multer.File
) {
  const fileSizeInMb = bToMb(file.size);

  if (fileSizeInMb > limitInMb) {
    throw new BadRequestErr(
      `File too large. Limit: ${limitInMb}mb`,
      TErrCode.FILE_TOO_LARGE
    );
  }
}
