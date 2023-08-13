import { Request, Response } from "express";
import Tag from "../../models/Tag";

export default async function getTags(req: Request, res: Response) {
  const owner = res.locals.jwtPayload.userId;

  const tags = await Tag.find({ owner });

  res.status(200).json(tags);
}
