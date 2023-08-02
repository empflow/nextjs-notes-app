import Cookies from "js-cookie";

/**
 * this is used to store data received from the backend on sign in or sign up
 * @param data data from /auth/sign-up or /auth/sign-in
 */
export default function storeAuthRespData(data: any) {
  const daysIn15Mins = 0.010416;
  const ninetyDays = 90;
  const refreshToken = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", data.accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
  Cookies.set("username", data.username);
}
