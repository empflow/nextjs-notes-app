import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import isSsr from "./isSsr";

export default async function isSignedIn() {
  let refreshToken: undefined | string | RequestCookie;
  let username: undefined | string | RequestCookie;

  if (isSsr()) {
    const cookieStore = (await import("next/headers")).cookies();
    refreshToken = cookieStore.get("refreshToken");
    username = cookieStore.get("username");
  } else {
    refreshToken = Cookies.get("refreshToken");
    username = Cookies.get("username");
  }

  if (refreshToken && username) return true;
  return false;
}
