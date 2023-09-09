import clearAuthData from "@/utils/clearAuthData";
import { TAxiosErrWithResp } from "@/utils/types";
import { TErrCode } from "@shared/types";
import axios, { AxiosRequestConfig } from "axios";
import isAxiosErrWithResp from "../../isAxiosErrWithResp";
import redirToSignIn from "../redirToSignIn";
import convertAccessTokenToAuthHeader from "./convertAccessTokenToAuthHeader";
import getAndStoreNewTokens from "./getAndStoreNewTokens";

export default async function rejectedRespInterceptor(err: any) {
  if (!canHandleErr(err)) return Promise.reject(err);

  const newTokens = await getAndStoreNewTokens();
  if (!newTokens) {
    clearAuthData();
    redirToSignIn();
    return Promise.reject(err);
  }

  try {
    const authToken = convertAccessTokenToAuthHeader(newTokens.accessToken);
    const reqConfig = getReqConfig(err, authToken);
    return axios(reqConfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

type ReturnTCanHandleErr = TAxiosErrWithResp & {
  config: AxiosRequestConfig;
  response: { data: { errCode: TErrCode.INVALID_ACCESS_TOKEN } };
};
function canHandleErr(err: any): err is ReturnTCanHandleErr {
  if (
    !isAxiosErrWithResp(err) ||
    err.response.data.errCode !== TErrCode.INVALID_ACCESS_TOKEN ||
    !err.config
  ) {
    return false;
  }
  return true;
}

function getReqConfig(err: ReturnTCanHandleErr, authToken: string) {
  const reqConfig: AxiosRequestConfig = {
    ...err.config,
    headers: { ...err.config.headers, Authorization: authToken },
  };
  return reqConfig;
}
