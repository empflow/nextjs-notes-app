import { Request, Response } from "express";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Tag, { ITag } from "../../models/Tag";
import { BadRequestErr, NotFoundErr } from "../../utils/errs";
import mongoUpdateOpts from "../../utils/mongoUpdateOpts";

export default async function updateTag(req: Request, res: Response) {
  const { tagId } = req.params;
  const { name, color } = req.body;
  const userId = res.locals.jwtPayload.userId;

  const filter: FilterQuery<ITag> = { _id: tagId, owner: userId };
  const update: UpdateQuery<ITag> = {
    name,
    color,
  };

  const updatedTag = await Tag.findOneAndUpdate(
    filter,
    update,
    mongoUpdateOpts
  );
  if (!updatedTag) throw new NotFoundErr("Tag not found");

  res.status(200).json(updatedTag);
}
