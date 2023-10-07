import S3 from "aws-sdk/clients/s3";
import getEnvVar from "../getEnvVar";
import getS3FileNames from "./getS3FileNames";
import getContentType from "./getContentType";
import getFileExt from "../getFileExt";

const accessKeyId = getEnvVar("S3_ACCESS_KEY_ID");
const secretAccessKey = getEnvVar("S3_SECRET_ACCESS_KEY");
const endpoint = getEnvVar("S3_ENDPOINT");
const bucketName = getEnvVar("S3_BUCKET_NAME");

const s3 = new S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  endpoint,
  apiVersion: "latest",
  s3ForcePathStyle: true,
});

/**
 *
 * @param body the file itself
 * @param filename this is needed to get the file extension like .jpeg or .png or .md or whatever
 */
export async function s3Upload(
  body: Buffer | Uint8Array | Blob | string,
  filename: string
) {
  try {
    const ext = getFileExt(filename);
    const key = getS3FileNames(ext);
    const contentType = getContentType(ext);

    const result = await s3
      .upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
      .promise();

    return result;
  } catch (err) {
    throw new Error("Upload error");
  }
}
