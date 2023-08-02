import Cookies from "js-cookie";

export default function signOutClearData() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("username");
}
