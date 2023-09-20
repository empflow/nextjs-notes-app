import { cookies } from "next/headers";
import getAuthDataGetReturnVal, {
  TGetAuthDataReturnT,
} from "./getAuthDataGetReturnVal";

export default function serverGetAuthData(): TGetAuthDataReturnT {
  const cookiesStore = cookies();
  let username: string | null;
  let refreshToken: string | null;

  username = cookiesStore.get("username")?.value ?? null;
  refreshToken = cookiesStore.get("refreshToken")?.value ?? null;

  return getAuthDataGetReturnVal(username, refreshToken);
}
