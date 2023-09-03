import { authRespSchema, TAuthResp } from "@shared/types";
import axios from "axios";
import Cookies from "js-cookie";
import storeAuthRespData from "../storeAuthRespData";
import baseUrl from "./baseUrl";
import sharedInterceptorFunctionality from "./sharedInterceptorFunctionality";

const httpWithAuth = axios.create({
  baseURL: baseUrl,
});

httpWithAuth.interceptors.request.use(async (req) => {
  sharedInterceptorFunctionality(req);
  const authHeader = await getAuthHeader();

  if (authHeader) {
    req.headers.Authorization = authHeader;
  } else {
    redirToSignIn();
    throw new axios.Cancel();
  }
  return req;
});

export default httpWithAuth;

async function getAuthHeader() {
  let accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    const newTokens = await getAndStoreNewTokens();
    if (!newTokens) return null;
    accessToken = newTokens.accessToken;
  }
  return convertAccessTokenToAuthHeader(accessToken);
}

async function getAndStoreNewTokens(): Promise<TAuthResp | null> {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return null;

  const authRespData = await getNewTokens(refreshToken);
  if (!authRespData) return null;
  storeAuthRespData(authRespData);
  return authRespData;
}

/**
 * @param refreshTokenSerialized the refresh token from the cookies
 */
export async function getNewTokens(refreshTokenSerialized: string) {
  const refreshTokenDeserialized = JSON.parse(refreshTokenSerialized);

  try {
    const { data } = await axios({
      url: "/auth/get-new-tokens",
      method: "post",
      data: { refreshToken: refreshTokenDeserialized },
    });
    const authRespData = authRespSchema.parse(data);
    return authRespData;
  } catch (err) {
    return null;
  }
}

export function convertAccessTokenToAuthHeader(accessToken: string) {
  return `Bearer ${accessToken}`;
}

export function redirToSignIn() {
  location.replace("/auth/sign-in");
}
