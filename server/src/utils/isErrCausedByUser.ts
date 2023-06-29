import { TErr } from "../middleware/errHandler";
import { MongoError, MongoServerError } from "mongodb";


export default function isErrCausedByUser(err: TErr) {
  if (
    err instanceof MongoError ||
    err instanceof MongoServerError ||
    isErrJsonSyntaxErr(err) ||
    err.name === "ValidationError" ||
    err.name === "CastError" ||
    err.name === "MongoServerError" ||
    err.name === "MulterError"
  ) {
      return true;
  }
  return false;
}

function isErrJsonSyntaxErr(err: TErr) {
  if (err instanceof SyntaxError && /JSON/.test(err.message)) {
    return true;
  }
  return false;
}
