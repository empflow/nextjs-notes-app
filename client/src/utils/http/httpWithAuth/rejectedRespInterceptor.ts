import clearAuthData from "@/utils/clearAuthData";
import { TErrCode } from "@shared/types";
import axios, { AxiosRequestConfig } from "axios";
import isAxiosErrWithResp from "../../isAxiosErrWithResp";
import redirToSignIn from "../redirToSignIn";
import convertAccessTokenToAuthHeader from "./convertAccessTokenToAuthHeader";
import getAndStoreNewTokens from "./getAndStoreNewTokens";

export default async function rejectedRespInterceptor(err: any) {
  if (
    !isAxiosErrWithResp(err) ||
    err.response.data.errCode !== TErrCode.INVALID_ACCESS_TOKEN
  ) {
    return Promise.reject(err);
  }

  const newTokens = await getAndStoreNewTokens();
  if (!newTokens || !err.config) {
    clearAuthData();
    redirToSignIn();
    return Promise.reject(err);
  }

  try {
    const authToken = convertAccessTokenToAuthHeader(newTokens.accessToken);
    const reqConfig: AxiosRequestConfig = {
      ...err.config,
      headers: { ...err.config.headers, Authorization: authToken },
    };
    const resp = await axios(reqConfig);
    return resp;
  } catch (err) {
    return Promise.reject(err);
  }
}
