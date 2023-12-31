import {
  BadRequestErr,
  ConflictErr,
  ForbiddenErr,
  NotFoundErr,
  UnauthorizedErr,
} from "../utils/errs";
import { MongoError } from "mongodb";

export type TErr = TApiErrs | Error | MongoError | SyntaxError;

export type TApiErrs =
  | BadRequestErr
  | UnauthorizedErr
  | NotFoundErr
  | ForbiddenErr
  | ConflictErr;
