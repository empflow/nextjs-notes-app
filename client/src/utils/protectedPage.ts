import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

interface Params {
  mode: "client" | "server";
}

export default function protectedPage(opts: Params) {
  const { mode = "server" } = opts ?? {};

  let refreshToken: RequestCookie | string | undefined;

  if (mode === "server") {
    const cookieStore = cookies();
    refreshToken = cookieStore.get("refreshToken");
  } else {
    refreshToken = Cookies.get("refreshToken");
  }

  if (!refreshToken) {
    return redirect("/sign-in");
  }
}
