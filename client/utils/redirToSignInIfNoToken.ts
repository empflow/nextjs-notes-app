import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default function redirToSignInIfNoToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return redirect("/auth/sign-in");
  }
}
