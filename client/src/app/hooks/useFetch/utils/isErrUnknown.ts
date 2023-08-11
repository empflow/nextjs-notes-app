import { AxiosError } from "axios";

export default function isErrUnknown(err: unknown) {
  if (!(err instanceof AxiosError) || !err.response) {
    return true;
  }
  return false;
}
