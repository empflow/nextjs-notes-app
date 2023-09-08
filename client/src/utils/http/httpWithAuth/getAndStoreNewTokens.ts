import { TAuthResp, TGetNewTokensResp } from "@shared/respsSchemas";
import Cookies from "js-cookie";
import storeAuthRespData from "@/utils/storeAuthRespData";
import getNewTokens from "./getNewTokens";

export default async function getAndStoreNewTokens(): Promise<TGetNewTokensResp | null> {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return null;

  const authRespData = await getNewTokens(refreshToken);
  if (!authRespData) return null;
  storeAuthRespData(authRespData);
  return authRespData;
}
