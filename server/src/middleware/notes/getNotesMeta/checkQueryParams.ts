import { BadRequestErr } from "@/server/src/utils/errs";
import { Request, Response, NextFunction } from "express";

export default async function getNotesMetaCheckQueryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tag } = req.query;

  if (tag) {
    if (typeof tag !== "string") {
      throw new BadRequestErr("`tag` query parameter is not of type string");
    }
  }

  res.locals.query = { tag };

  next();
}
