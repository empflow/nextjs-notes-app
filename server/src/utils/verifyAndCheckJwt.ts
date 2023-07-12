import getEnvVar from "./getEnvVar";
import jwt from "jsonwebtoken";
import { BadRequestErr } from "./errs";

export default function verifyAndValidateJwt(
  token: string,
  secretKeyEnvVarName: string,
  errMsg: string = "Invalid token",
  opts?: {
    jwtExpiredErrMsg?: string;
  }
) {
  try {
    const secret = getEnvVar(secretKeyEnvVarName);
    const payload = jwt.verify(token, secret);
    if (typeof payload === "string") throw new Error();
    return payload;
  } catch (err) {
    if ((err as any).message === "jwt expired") {
      const defaultErrMsg = "Jwt expired";
      throw new BadRequestErr(opts?.jwtExpiredErrMsg || defaultErrMsg);
    }
    throw new BadRequestErr(errMsg);
  }
}
