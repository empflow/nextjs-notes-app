import { NextFunction, Request, Response } from "express";
import ApiErr, { HttpCode } from "../utils/errs/ApiErr";
import { TApiErrs } from "../utils/errs";
import { MongoError } from "mongodb";
import isErrCausedByUser from "../utils/isErrCausedByUser";
import { TErrCode } from "@/shared/types";

export type TErr = TApiErrs | Error | MongoError | SyntaxError;

interface TErrObject {
  message: string;
  errCode?: TErrCode;
  httpCode?: number;
  duplicates?: string[];
}

export default function errHandler(
  err: TErr,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errObj: TErrObject = {
    message: err.message || "No error message provided",
  };

  let httpCode = 500;
  const isApiErr = err instanceof ApiErr;

  if (isApiErr) {
    if (err.errCode) errObj.errCode = err.errCode;
  }

  if (err instanceof ApiErr) {
    httpCode = err.httpCode;
  } else if (isErrCausedByUser(err)) {
    httpCode = HttpCode.BadRequest;
  } else {
    console.error(err);
    errObj.message = "Internal server error";
  }

  res.status(httpCode).json(errObj);
}
