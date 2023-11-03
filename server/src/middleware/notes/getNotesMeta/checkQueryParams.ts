import { TNoteServer } from "@/server/src/models/Note";
import { BadRequestErr } from "@/server/src/utils/errs";
import { Request, Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";

export default async function getNotesMetaCheckQueryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tag } = req.query;
  const query: FilterQuery<TNoteServer> = {};

  if (tag) {
    if (typeof tag !== "string") {
      throw new BadRequestErr("`tag` query parameter is not of type string");
    }
    query.tags = tag;
  }

  res.locals.query = query;
  next();
}
