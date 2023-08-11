import notify from "@/utils/notify";
import clearAuthData from "@/utils/clearAuthData";
import { TTranslations } from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { Formats, TranslationValues } from "next-intl";
import React from "react";
import hasRefreshTokenExpired from "./hasRefreshTokenExpired";
import isErrUnknown from "./isErrUnknown";

interface TGetNewTokensReturnValue {
  err?: {
    msg: string | React.ReactNode;
  };
  data?: any;
}

export default async function getNewTokens(
  translations: TTranslations,
  notSignedInMsg: React.ReactNode,
): Promise<TGetNewTokensReturnValue> {
  const genericErr: TGetNewTokensReturnValue = {
    err: { msg: translations("generic") },
  };
  const notSignedInErr: TGetNewTokensReturnValue = {
    err: { msg: notSignedInMsg },
  };

  const refreshTokenSerialized = Cookies.get("refreshToken");
  if (!refreshTokenSerialized) return notSignedInErr;

  const refreshToken = JSON.parse(refreshTokenSerialized);
  const isOnline = navigator.onLine;

  if (!isOnline) return { err: { msg: translations("noInternet") } };

  try {
    const resp = await axios.post("/auth/get-new-tokens", {
      refreshToken,
    });
    return { data: resp.data };
  } catch (err) {
    if (isErrUnknown(err)) return genericErr;

    const { data } = (err as any).response;
    if (hasRefreshTokenExpired(data)) {
      clearAuthData();
      return { err: { msg: notSignedInMsg } };
    }
    return genericErr;
  }
}
