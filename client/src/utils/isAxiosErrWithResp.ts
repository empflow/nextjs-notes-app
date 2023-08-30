import { isAxiosError } from "axios";
import { TAxiosErrWithResp } from "./types";

export default function isAxiosErrWithResp(
  err: unknown,
): err is TAxiosErrWithResp {
  if (!isAxiosError(err) || !err.response) {
    return false;
  }
  return true;
}
