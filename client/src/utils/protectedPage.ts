import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default function protectedPage() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) {
    return redirect("/sign-in");
  }
}
