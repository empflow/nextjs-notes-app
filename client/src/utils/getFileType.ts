import filetypeinfo from "magic-bytes.js";

export default async function getFileType(file: File) {
  try {
    const arrBuffer = await file.arrayBuffer();
    const uint8arr = new Uint8Array(arrBuffer);
    const [{ typename }] = filetypeinfo(uint8arr);
    return typename;
  } catch (err) {
    return "unsupportedFileFormat";
  }
}
