import { getNewTokensRespSchema } from "@shared/respSchemas/getNewTokens";
import axios from "axios";
import baseUrl from "../baseUrl";

/**
 * @param refreshTokenSerialized the refresh token from the cookies (it's already supposed to be serialized)
 */
export default async function getNewTokens(refreshTokenSerialized: string) {
  const refreshTokenDeserialized = JSON.parse(refreshTokenSerialized);

  try {
    const { data } = await axios({
      url: `${baseUrl}/auth/get-new-tokens`,
      method: "post",
      data: { refreshToken: refreshTokenDeserialized },
    });
    const authRespData = getNewTokensRespSchema.parse(data);
    return authRespData;
  } catch (err) {
    return null;
  }
}
