import { Request, Response } from "express";
import Note, { INote } from "../../models/Note";
import Tag, { ITag } from "../../models/Tag";
import { NotFoundErr } from "../../utils/errs";

export default async function deleteTag(req: Request, res: Response) {
  const { tagId } = req.params;
  const owner = res.locals.jwtPayload.userId;

  const deletedTag = await Tag.findOneAndDelete({
    owner,
    _id: tagId,
  });
  if (!deletedTag) {
    throw new NotFoundErr("Tag not found");
  }

  const updatedNotes = await Note.updateMany(
    { tags: { $in: [tagId] } },
    { $pull: { tags: tagId } }
  );

  res.status(200).json({ ok: true });
}
