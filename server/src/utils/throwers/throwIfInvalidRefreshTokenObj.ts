import { BadRequestErr } from "../errs";

export default function throwIfInvalidRefreshTokenObj(token: any) {
  if (typeof token.token !== "string" || typeof token.id !== "string") {
    const msg = "Refresh token must be of type { id: string, token: string }";
    throw new BadRequestErr(msg);
  }
}
