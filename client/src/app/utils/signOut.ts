import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function signOut() {
  localStorage.removeItem("username");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  redirect("/sign-in");
}
