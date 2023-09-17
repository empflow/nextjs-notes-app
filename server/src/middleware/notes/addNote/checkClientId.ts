import { uuidRegex } from "../../../../../shared/regexes";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { BadRequestErr } from "../../../utils/errs";

export default async function addNoteCheckClientId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { clientId } = req.body;

  if (!clientId) {
    res.locals.clientId = uuid();
    return next();
  }

  if (!uuidRegex.test(clientId)) {
    throw new BadRequestErr("clientId must be a UUID v4");
  }

  res.locals.clientId = clientId;
  next();
}
