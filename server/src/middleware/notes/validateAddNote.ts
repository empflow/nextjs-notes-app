import { NextFunction, Request, Response } from "express";

export default async function validateAddNote(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next();
}
