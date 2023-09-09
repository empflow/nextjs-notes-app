import { NextFunction, Request, Response } from "express";

export default async function validateGetNote(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next();
}
