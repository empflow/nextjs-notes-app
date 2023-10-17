import { ALLOWED_IMG_EXTS } from "@shared/values";
import getFileType from "./getFileType";
import notify from "./notify";

export default async function checkFileFormat(files: FileList, errMsg: string) {
  const file = files[0];
  if (!file) return true;

  const fileType = await getFileType(file);
  if (!ALLOWED_IMG_EXTS.includes(fileType)) {
    notify(errMsg, "error");
    return false;
  }

  return true;
}
