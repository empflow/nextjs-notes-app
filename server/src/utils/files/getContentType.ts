import mime from "mime-types";

export default function getContentType(ext: string) {
  return mime.lookup(ext) || "application/octet-stream";
}
