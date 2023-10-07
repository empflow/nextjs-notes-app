import { Options } from "multer";
import { BadRequestErr } from "./errs";
import multer from "multer";
import getFileExt from "./getFileExt";

export default function getMulterUploadMw(allowedFileExts: string[]) {
  const multerOptions: Options = {
    fileFilter(_req, file, callback) {
      const fileExt = getFileExt(file.originalname);

      if (allowedFileExts.includes(fileExt)) {
        callback(null, true);
      } else {
        const err = new BadRequestErr(`Forbidden file extension`);
        callback(err);
      }
    },
  };

  return multer(multerOptions);
}
