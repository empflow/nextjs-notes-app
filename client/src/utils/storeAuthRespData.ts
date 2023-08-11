import { daysIn15Mins, ninetyDays } from "@/constants/time";
import axios from "@/config/axios";
import Cookies from "js-cookie";
import notify from "./notify";
import { TTranslations } from "./types";

/**
 * this is used to store data received from the backend on sign in or sign up
 * @param data data from /auth/sign-up or /auth/sign-in (url may change, but this is unlikely)
 */
export default function storeAuthRespData(
  data: any,
  errTranslations: TTranslations,
) {
  const { refreshToken, accessToken, username } = data;

  if (!refreshToken || !accessToken || !username) {
    return notify(errTranslations("generic"));
  }
  const refreshTokenSerialized = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshTokenSerialized, { expires: ninetyDays });
  Cookies.set("username", username);
}
