"use client";
import { TAuthResp, TErrCode } from "@shared/types";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "@config/axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import notify from "@/utils/notify";
import isOnline from "@/utils/isOnline";
import storeAuthRespData from "@/utils/storeAuthRespData";
import isValidAuthResp from "@/utils/isValidAuthResp";
import Link from "next/link";
import { useTranslations } from "next-intl";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

interface Params {
  url: string;
  method: HttpMethod;
  body?: any;
  opts?: {
    fetchImmediately?: boolean;
    persistDataWhileFetching?: boolean;
    withAuth?: boolean;
  };
}

export default function useFetch<T extends unknown>({
  url,
  method,
  body,
  opts,
}: Params) {
  const errsT = useTranslations("Errors");
  const {
    fetchImmediately = true,
    persistDataWhileFetching = true,
    withAuth = true,
  } = opts ?? {};

  const [err, setErr] = useState<AxiosResponse | null>(null);
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(false);
  const notSignedInNotificationContent = (
    <>
      {errsT("notSignedIn")} <Link href="/">{errsT("notSignedInLink")}</Link>
    </>
  );

  useEffect(() => {
    (async () => {
      if (fetchImmediately) await fetch();
    })();
  }, []);

  async function fetch(customBody?: unknown) {
    fetchSetup();
    if (!notifyIfCantFetch().ok) return;

    if (withAuth) await fetchWithAuth(customBody);
    else await fetchWithoutAuth(customBody);

    fetchTeardown();
  }

  function fetchSetup() {
    if (!persistDataWhileFetching) setData(null);
    setErr(null);
    setLoading(true);
  }

  function notifyIfCantFetch(): { ok: boolean } {
    if (isOnline()) return { ok: true };

    setLoading(false);
    notify("Check your internet connection and try again");
    return { ok: false };
  }

  function fetchTeardown() {
    setLoading(false);
  }

  async function fetchWithAuth(customBody?: unknown) {
    const authHeader = await getExistingAuthHeader();
    if (!authHeader) return;

    try {
      const resp = await makeReq(authHeader, customBody);
      setData(resp.data);
    } catch (err) {
      await handleFetchWithAuthErr(err);
    }
  }

  /**
   * WARNING: this function will throw if axios will throw, make sure to put it in a try-catch block
   */
  function makeReq(authHeader: string, customBody?: unknown) {
    return axios({
      url,
      method,
      headers: { Authorization: authHeader },
      data: customBody ?? body,
    });
  }

  async function handleFetchWithAuthErr(err: unknown, customBody?: unknown) {
    if (!isAxiosError(err) || !err.response) {
      return notify(errsT("generic"));
    }

    if (err.response.data.errCode === TErrCode.INVALID_ACCESS_TOKEN) {
      const authHeader = await getNewAuthHeader();
      if (!authHeader) return;

      try {
        const resp = await makeReq(authHeader, customBody);
        setData(resp.data);
      } catch (err) {
        if (!isAxiosError(err) || !err.response) {
          return notify(errsT("generic"));
        }
        notify(errsT("generic"));
        setErr(err.response);
      }
    }
    setErr(err.response);
  }

  type TGetAuthHeaderReturnVal = string | null;

  async function getExistingAuthHeader(): Promise<TGetAuthHeaderReturnVal> {
    let accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      const newTokens = await getAndStoreNewTokens();
      if (!newTokens) return null;
      accessToken = newTokens.accessToken;
    }
    return convertAccessTokenToAuthHeader(accessToken);
  }

  async function getNewAuthHeader(): Promise<TGetAuthHeaderReturnVal> {
    const newTokens = await getAndStoreNewTokens();
    console.log(newTokens);
    if (!newTokens) return null;
    return convertAccessTokenToAuthHeader(newTokens.accessToken);
  }

  function convertAccessTokenToAuthHeader(accessToken: string) {
    return `Bearer ${accessToken}`;
  }

  async function getAndStoreNewTokens(): Promise<TAuthResp | null> {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      notify(notSignedInNotificationContent);
      return null;
    }

    try {
      const data = await getNewTokens(refreshToken);
      if (!data) return null;
      storeAuthRespData(data);
      return data;
    } catch (err) {
      handleGetAndStoreNewTokensErr(err);
      return null;
    }
  }

  /**
   *
   * @param refreshTokenFromCookies must be serialized (Pass the token as is it in cookies, don't JSON.parse() it)
   */
  async function getNewTokens(refreshTokenFromCookies: string) {
    const refreshTokenDeserialized = JSON.parse(refreshTokenFromCookies);
    const resp = await axios({
      url: "/auth/get-new-tokens",
      method: "post",
      data: { refreshToken: refreshTokenDeserialized },
    });
    if (!isValidAuthResp(resp.data)) {
      notify(errsT("generic"));
      return null;
    }
    return resp.data;
  }

  function handleGetAndStoreNewTokensErr(err: unknown) {
    if (!isAxiosError(err) || !err.response) {
      return notify(errsT("generic"));
    }
    notify(notSignedInNotificationContent);
  }

  async function fetchWithoutAuth(customBody?: unknown) {
    try {
      const resp = await axios({ url, method, data: customBody ?? body });
      setData(resp.data);
    } catch (err) {
      handleFetchWithoutAuthErr(err);
    }
  }

  function handleFetchWithoutAuthErr(err: unknown) {
    if (!isAxiosError(err) || !err.response) {
      return notify(errsT("generic"));
    }
    setErr(err.response);
  }

  return { err, data, setData, loading, setLoading, fetch };
}
