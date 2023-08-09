import { daysIn15Mins, ninetyDays } from "@/constants/time";
import Cookies from "js-cookie";

/**
 * this is used to store data received from the backend on sign in or sign up
 * @param data data from /auth/sign-up or /auth/sign-in (url may change, but this is unlikely)
 */
export default function storeAuthRespData(data: any) {
  const { refreshToken, accessToken, username } = data;

  const endpoint = "/auth/get-new-tokens";
  if (!refreshToken)
    throw new Error(`No refresh token in response from '${endpoint}'`);
  if (!accessToken)
    throw new Error(`No access token in response from '${endpoint}'`);
  if (!username) throw new Error(`No username in response from '${endpoint}'`);

  const refreshTokenStringified = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshTokenStringified, { expires: ninetyDays });
  Cookies.set("username", username);
}
