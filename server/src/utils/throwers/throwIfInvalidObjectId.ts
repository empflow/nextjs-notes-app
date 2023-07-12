import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../errs";

interface Options {
  msg?: string;
}

export default function throwIfInvalidObjectId(data: any, opts?: Options) {
  const defaultErrMsg = "Invalid id";
  if (!isValidObjectId(data)) {
    throw new BadRequestErr(opts?.msg ?? defaultErrMsg);
  }
}
