import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../errs";

export default function throwIfInvalidObjectId(data: any, errMsg?: string) {
  const defaultErrMsg = "Invalid id";
  if (!isValidObjectId(data)) {
    throw new BadRequestErr(errMsg ?? defaultErrMsg);
  }
}
