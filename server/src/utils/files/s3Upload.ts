import getFileExt from "../getFileExt";
import getContentType from "./getContentType";
import getS3FileNames from "./getS3FileNames";
import { s3, s3Credentials } from "./s3";

interface TS3UploadOpts {
  filename?: string;
  ext?: string;
}

/**
 *
 * @param body the file itself
 * @param filename this is needed to get the file extension like .jpeg or .png or .md or whatever
 */
export default async function s3Upload(
  file: Express.Multer.File | Buffer,
  { ext: explicitlySetExt, filename = "" }: TS3UploadOpts = {}
) {
  try {
    const ext = explicitlySetExt ?? getFileExt(filename);
    const key = getS3FileNames(ext);
    const contentType = getContentType(ext);
    const buffer = getBuffer(file);

    return uploadFileToS3({ key, buffer, contentType });
  } catch (err) {
    throw new Error("Upload error");
  }
}

function getBuffer(file: Express.Multer.File | Buffer) {
  if (file instanceof Buffer) return file;
  return file.buffer;
}

function uploadFileToS3({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer;
  contentType: string;
}) {
  return s3
    .upload({
      Bucket: s3Credentials.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
    .promise();
}
