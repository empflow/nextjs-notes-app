import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import isSsr from "./isSsr";
import { TCookie } from "./types";

export default function protectedPage() {
  let refreshToken: TCookie | undefined;

  if (isSsr()) {
    const cookieStore = cookies();
    refreshToken = cookieStore.get("refreshToken");
  } else {
    refreshToken = Cookies.get("refreshToken");
  }

  if (!refreshToken) {
    return redirect("/auth/sign-in");
  }
}
