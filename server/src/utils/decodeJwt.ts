import jwt from "jsonwebtoken";
import { BadRequestErr } from "./errs";

export default function decodeJwt(
  token: string,
  opts?: {
    errMsg?: string;
  }
) {
  const { errMsg = "Invalid token" } = opts ?? {};

  try {
    const payload = jwt.decode(token);
    if (!payload) throw new Error();
    if (typeof payload === "string") throw new Error();
    return payload;
  } catch (err) {
    throw new BadRequestErr(errMsg);
  }
}
