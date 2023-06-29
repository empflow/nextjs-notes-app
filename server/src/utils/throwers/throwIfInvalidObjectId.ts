import { isValidObjectId } from "mongoose";
import { BadRequestErr } from "../errs";

export default function throwIfInvalidObjectId(data: any) {
  if (!isValidObjectId(data)) {
    throw new BadRequestErr("Invalid id");
  }
}
