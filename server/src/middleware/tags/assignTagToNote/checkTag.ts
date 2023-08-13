import { Request, Response, NextFunction } from "express";
import Tag from "../../../models/Tag";
import { NotFoundErr } from "../../../utils/errs";

export default async function assignTagToNoteCheckTag(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tagId } = req.params;
  const owner = res.locals.jwtPayload.userId;

  const tag = await Tag.findOne({ owner, _id: tagId });
  if (!tag) throw new NotFoundErr("Tag not found");

  next();
}
