import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../utils/errs";

export default function checkParamObjectId(paramName: string) {
  return function (req: Request, _res: Response, next: NextFunction) {
    const param = req.params[paramName];

    if (!param) throw new BadRequestErr("No id provided");
    if (!isValidObjectId(param)) throw new BadRequestErr("Invalid id");

    next();
  };
}
