export default function getImgCompressionQuality(file: Buffer) {
  const sizeInMb = file.byteLength / 1_000_000;

  let quality: number;
  if (sizeInMb > 3) quality = 60;
  else if (sizeInMb > 2) quality = 70;
  else if (sizeInMb > 1) quality = 80;
  else quality = 85;

  return quality;
}
