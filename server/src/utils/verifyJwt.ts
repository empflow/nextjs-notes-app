import getEnvVar from "./getEnvVar";
import jwt from "jsonwebtoken";
import { BadRequestErr } from "./errs";

export default function verifyJwt(
  token: string,
  secretKeyEnvVarName: string,
  opts?: {
    errMsg?: string;
    jwtExpiredErrMsg?: string;
  }
) {
  const { errMsg = "Invalid token", jwtExpiredErrMsg = "Jwt expired" } =
    opts ?? {};

  try {
    const secret = getEnvVar(secretKeyEnvVarName);
    const payload = jwt.verify(token, secret);
    if (typeof payload === "string") throw new Error();
    return payload;
  } catch (err) {
    if ((err as any).message === "jwt expired") {
      throw new BadRequestErr(jwtExpiredErrMsg);
    }
    throw new BadRequestErr(errMsg);
  }
}
