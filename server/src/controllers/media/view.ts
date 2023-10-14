import { Request, Response } from "express";
import { TViewMediaFileRespSchema } from "@/shared/respSchemas/viewMediaFile";

export default async function viewMediaFile(req: Request, res: Response) {
  const { signedUrl, mediaFile } = res.locals;

  const resp: TViewMediaFileRespSchema = {
    placeholderImgBase64: mediaFile.placeholderImgBase64,
    url: signedUrl,
  };
  res.json(resp);
}
