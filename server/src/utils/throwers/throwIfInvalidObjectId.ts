import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../errs";

interface TOpts {
  msg?: string;
}

export default function throwIfInvalidObjectId(data: any, opts?: TOpts) {
  const defaultErrMsg = "Invalid id";
  if (!isValidObjectId(data)) {
    throw new BadRequestErr(opts?.msg ?? defaultErrMsg);
  }
}
