import S3 from "aws-sdk/clients/s3";
import getEnvVar from "../getEnvVar";

export const s3Credentials = {
  accessKeyId: getEnvVar("S3_ACCESS_KEY_ID"),
  secretAccessKey: getEnvVar("S3_SECRET_ACCESS_KEY"),
  endpoint: getEnvVar("S3_ENDPOINT"),
  bucketName: getEnvVar("S3_BUCKET_NAME"),
};

export const s3 = new S3({
  credentials: {
    accessKeyId: s3Credentials.accessKeyId,
    secretAccessKey: s3Credentials.secretAccessKey,
  },
  endpoint: s3Credentials.endpoint,
  apiVersion: "latest",
  s3ForcePathStyle: true,
});
