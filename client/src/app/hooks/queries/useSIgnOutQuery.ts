import clearAuthData from "@/utils/clearAuthData";
import http from "@/utils/http/http";
import { signOutRespSchema } from "@shared/respsSchemas";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useCommonNotifications from "../useCommonNotifications";

export default function useSignOutQuery() {
  const { notifyGenericErr } = useCommonNotifications();
  return useQuery(["signOut"], fetchSignOut, { enabled: false });

  async function fetchSignOut() {
    try {
      let refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error();
      refreshToken = JSON.parse(refreshToken);

      const { data } = await http.post("/auth/sign-out", { refreshToken });
      signOutRespSchema.parse(data);
      clearAuthData();
      location.replace("/");
    } catch (err) {
      notifyGenericErr();
    } finally {
      return null;
    }
  }
}
