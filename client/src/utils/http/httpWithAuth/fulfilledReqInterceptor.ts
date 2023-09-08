import axios, { InternalAxiosRequestConfig } from "axios";
import getAuthHeader from "./getAuthHeader";
import redirToSignIn from "../redirToSignIn";

export default async function fulfilledReqInterceptor(
  req: InternalAxiosRequestConfig<any>,
) {
  const authHeader = await getAuthHeader();

  if (authHeader) {
    req.headers.Authorization = authHeader;
  } else {
    redirToSignIn();
    throw new axios.Cancel();
  }
  return req;
}
