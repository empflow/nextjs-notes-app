import { daysIn15Mins, ninetyDays } from "@/constants/time";
import Cookies from "js-cookie";

/**
 * this function is used to store data received from the backend when getting a new pair of access and refresh tokens
 * @param data data from /auth/get-new-tokens (url may change, but this is unlikely)
 */
export default function storeGetNewTokensRespData(data: any) {
  const { refreshToken, accessToken } = data;

  const endpoint = "/auth/get-new-tokens";
  if (!refreshToken)
    throw new Error(`No refresh token in response from '${endpoint}'`);
  if (!accessToken)
    throw new Error(`No access token in response from '${endpoint}'`);

  const refreshTokenStringified = JSON.stringify(data.refreshToken);

  Cookies.set("refreshToken", refreshTokenStringified, {
    expires: ninetyDays,
  });
  Cookies.set("accessToken", accessToken, {
    expires: daysIn15Mins,
  });
}
