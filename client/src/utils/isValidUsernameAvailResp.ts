import { TUsernameAvailResp } from "@shared/types";
import isObject from "./isObject";

export default function isValidUsernameAvailResp(
  payload: unknown,
): payload is TUsernameAvailResp {
  if (!isObject(payload)) return false;

  if (typeof payload.ok === "boolean") return true;
  return false;
}
