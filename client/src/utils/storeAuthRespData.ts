import Cookies, { CookieAttributes } from "js-cookie";
import { TAuthResp } from "@shared/types";

const ninetyDays = 90;
const daysIn15Mins = 0.010416;

const commonOpts: CookieAttributes = {
  sameSite: "Strict",
};

/**
 * this is used to store data received from the backend on sign in or sign up
 * @param data data from /auth/sign-up or /auth/sign-in (url may change, but this is unlikely)
 */
export default function storeAuthRespData(data: TAuthResp) {
  const { refreshToken, accessToken, username } = data;

  const refreshTokenSerialized = JSON.stringify(refreshToken);

  Cookies.set("accessToken", accessToken, {
    expires: daysIn15Mins,
    ...commonOpts,
  });
  Cookies.set("refreshToken", refreshTokenSerialized, {
    expires: ninetyDays,
    ...commonOpts,
  });
  if (username) {
    Cookies.set("username", username, { ...commonOpts });
  }
}
