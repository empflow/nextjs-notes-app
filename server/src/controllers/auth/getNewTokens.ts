import { Request, Response } from "express";

export default async function getNewTokens(req: Request, res: Response) {
  res.status(200).json({ hello: true });
}
