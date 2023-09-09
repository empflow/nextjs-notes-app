import axios, { InternalAxiosRequestConfig } from "axios";
import getAuthHeader from "./getAuthHeader";
import redirToSignInAndClearAuthData from "../redirToSignInAndClearAuthData";

export default async function fulfilledReqInterceptor(
  req: InternalAxiosRequestConfig<any>,
) {
  const authHeader = await getAuthHeader();

  if (authHeader) {
    req.headers.Authorization = authHeader;
  } else {
    redirToSignInAndClearAuthData();
    throw new axios.Cancel();
  }
  return req;
}
