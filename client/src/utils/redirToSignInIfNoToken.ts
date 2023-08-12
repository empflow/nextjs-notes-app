import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

interface Opts {
  mode?: "client" | "server";
}

export default function redirToSignInIfNoToken(opts?: Opts) {
  const { mode = "server" } = opts ?? {};

  let accessToken: RequestCookie | string | undefined;
  let refreshToken: RequestCookie | string | undefined;

  if (mode === "server") {
    const cookieStore = cookies();
    refreshToken = cookieStore.get("refreshToken");
    accessToken = cookieStore.get("accessToken");
  } else {
    accessToken = Cookies.get("accessToken");
    refreshToken = Cookies.get("refreshToken");
  }

  if (!refreshToken) {
    return redirect("/sign-in");
  }
}
