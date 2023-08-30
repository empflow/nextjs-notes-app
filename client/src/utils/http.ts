import isOnline from "@/utils/isOnline";
import storeAuthRespData from "@/utils/storeAuthRespData";
import { authRespSchema, TAuthResp } from "@shared/types";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) throw new Error(`api base url not provided`);

const http = axios.create({
  baseURL: baseUrl,
});

http.interceptors.request.use(async (req) => {
  if (!isOnline()) throw new axios.Cancel();

  if (req.withCredentials) {
    const authHeader = await getAuthHeader();

    if (authHeader) {
      req.headers.Authorization = authHeader;
    } else {
      redirToSignIn();
      throw new axios.Cancel();
    }
  }

  return req;
});

export default http;

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
async function getNewTokens(refreshTokenSerialized: string) {
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

function convertAccessTokenToAuthHeader(accessToken: string) {
  return `Bearer ${accessToken}`;
}

function redirToSignIn() {
  location.replace("/auth/sign-in");
}
