import jwt from "jsonwebtoken";
import { BadRequestErr } from "./errs";

export default function decodeAndValidateJwt(
  token: string,
  errMsg: string = "Invalid token"
) {
  try {
    const payload = jwt.decode(token);
    if (!payload) throw new Error();
    if (typeof payload === "string") throw new Error();
    return payload;
  } catch (err) {
    throw new BadRequestErr(errMsg);
  }
}
