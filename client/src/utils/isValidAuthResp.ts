import { TAuthResp } from "@shared/respsSchemas";
import isObject from "./isObject";
import isString from "./isString";

export default function isValidAuthResp(
  payload: unknown,
): payload is TAuthResp {
  if (!isObject(payload) || !isObject(payload.refreshToken)) return false;

  const {
    accessToken,
    refreshToken: { id, token },
  } = payload;

  if (isString(accessToken) && isString(id) && isString(token)) {
    return true;
  }
  return false;
}
