import { Request, Response } from "express";
import Tag from "../../models/Tag";

export default async function addTag(req: Request, res: Response) {
  const { name, color } = req.body;

  const owner = res.locals.jwtPayload.userId;
  const createdTag = await Tag.create({ name, color, owner });

  res.status(201).json(createdTag);
}
