import { nanoid } from "nanoid";

function getS3FileNames(ext: string): string;
function getS3FileNames(ext: string, amount: 1): string;
function getS3FileNames(ext: string, amount: number): string[];

function getS3FileNames(ext: string, amount?: number) {
  if (!amount) return getFileName(ext);

  const fileNames: string[] = [];

  for (let i = 0; i < amount; i++) {
    const fileName = getFileName(ext);
    fileNames.push(fileName);
  }

  return fileNames;
}

function getFileName(ext: string) {
  return `${nanoid(16)}-${Date.now()}.${ext}`;
}

export default getS3FileNames;
