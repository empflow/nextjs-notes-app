import path from "path";

export default function getFileExt(filename: string) {
  const extWithDot = path.extname(filename);
  return extWithDot.replace(".", "");
}
