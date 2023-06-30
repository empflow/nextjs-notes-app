import { NextFunction, Request, Response } from "express";

export default function validateGetNotesMeta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId: string = res.locals.jwtPayload.userId;
  next();
}
