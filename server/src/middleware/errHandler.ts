import { NextFunction, Request, Response } from "express";
import ApiErr, { ErrCodes } from "../utils/errs/ApiErr";
import { TApiErrs } from "../utils/errs";
import { MongoError } from "mongodb";
import isErrCausedByUser from "../utils/isErrCausedByUser";

export type TErr = TApiErrs | Error | MongoError | SyntaxError;

interface IErrObject {
  message: string;
  code?: number;
  duplicates?: string[];
}

export default function errHandler(
  err: TErr,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errObj: IErrObject = {
    message: err.message || "No error message was provided",
  };
  let code = 500;

  if (err.name === "ApiErr") {
    code = (err as ApiErr).code;
  } else if (isErrCausedByUser(err)) {
    code = ErrCodes.BadRequest;
  } else {
    console.error(err);
  }

  res.status(code).json(errObj);
}
