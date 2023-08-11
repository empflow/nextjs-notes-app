import Cookies from "js-cookie";

export default function clearAuthData() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("username");
}
