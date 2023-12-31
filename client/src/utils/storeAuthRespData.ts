import Cookies, { CookieAttributes } from "js-cookie";
import { TGetNewTokensResp } from "@shared/respSchemas/getNewTokens";

const daysIn15Mins = 0.010416;

/**
 * this is used to store data received from the backend on sign in or sign up
 * @param data data from /auth/sign-up or /auth/sign-in (url may change, but this is unlikely)
 */
export default function storeAuthRespData(data: TGetNewTokensResp) {
  const { refreshToken, accessToken, username } = data;
  const refreshTokenSerialized = JSON.stringify(refreshToken);

  setAccessTokenCookie(accessToken);
  setRefreshTokenCookie(refreshTokenSerialized);
  if (username) {
    setUsernameCookie(username);
  }
}

const commonOpts: CookieAttributes = {
  sameSite: "Strict",
};

function setAccessTokenCookie(value: string) {
  Cookies.set("accessToken", value, {
    expires: daysIn15Mins,
    ...commonOpts,
  });
}
function setRefreshTokenCookie(value: string) {
  Cookies.set("refreshToken", value, {
    expires: 90,
    ...commonOpts,
  });
}

function setUsernameCookie(value: string) {
  Cookies.set("username", value, { ...commonOpts, expires: 1000 });
}
