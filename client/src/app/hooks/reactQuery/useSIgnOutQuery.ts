import clearAuthData from "@/utils/clearAuthData";
import http from "@/utils/http/http/http";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function useSignOutQuery() {
  return useQuery(["signOut"], fetchSignOut, { enabled: false });

  async function fetchSignOut() {
    try {
      let refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error();
      refreshToken = JSON.parse(refreshToken);

      await http.post("/auth/sign-out", { refreshToken });
    } catch (err) {}

    clearAuthData();
    location.replace("/");
    return null;
  }
}
