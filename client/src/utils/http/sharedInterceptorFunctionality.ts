import axios, { AxiosRequestConfig } from "axios";
import isOnline from "../isOnline";

export default function sharedInterceptorFunctionality(
  _req: AxiosRequestConfig,
) {
  if (!isOnline()) throw new axios.Cancel();
}
