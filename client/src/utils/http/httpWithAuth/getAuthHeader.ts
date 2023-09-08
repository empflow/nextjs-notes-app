import Cookies from "js-cookie";
import convertAccessTokenToAuthHeader from "./convertAccessTokenToAuthHeader";
import getAndStoreNewTokens from "./getAndStoreNewTokens";

export default async function getAuthHeader() {
  let accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    const newTokens = await getAndStoreNewTokens();
    if (!newTokens) return null;
    accessToken = newTokens.accessToken;
  }
  return convertAccessTokenToAuthHeader(accessToken);
}
