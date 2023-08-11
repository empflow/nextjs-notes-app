import axios from "@/config/axios";
import { AxiosError, isAxiosError, Method } from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HttpCodes from "@/constants/httpCodes";
import notify from "@/utils/notify";
import { Formats, TranslationValues, useTranslations } from "next-intl";
import Link from "next/link";
import storeGetNewTokensRespData from "@/utils/storeGetNewTokensRespData";
import isErrUnknown from "./utils/isErrUnknown";
import hasRefreshTokenExpired from "./utils/hasRefreshTokenExpired";
import hasAccessTokenExpired from "./utils/hasAccessTokenExpired";
import getNewTokens from "./utils/getNewTokens";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

interface Opts {
  method: HttpMethod;
  body?: any;
  fetchImmediately?: boolean;
  persistDataWhileFetching?: boolean;
  withAuth?: boolean;
}

export default function useFetch(
  url: string,
  { method, body, fetchImmediately, persistDataWhileFetching, withAuth }: Opts,
) {
  withAuth = withAuth ?? true;
  const [err, setErr] = useState<AxiosError | null>(null);
  const [data, setData] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(false);
  const errsT = useTranslations("Errors");
  const notSignedInMsg = (
    <>
      {errsT("notSignedIn")}{" "}
      <Link href="/sign-in">{errsT("notSignedInLink")}</Link>
    </>
  );

  useEffect(() => {
    if (fetchImmediately) fetch();
  }, []);

  function fetchSetup() {
    if (!persistDataWhileFetching) setData(null);
    setErr(null);
    setLoading(true);
  }

  async function fetch(customBody?: any) {
    fetchSetup();
    const isOnline = navigator.onLine;

    try {
      if (!isOnline) return notify(errsT("noInternet"));

      if (withAuth) {
        axios.interceptors.request.use((config) => {
          config.headers.Authorization = getAuthHeader();
          return config;
        });
      }

      const resp = await axios[method](url, customBody ?? body);
      setData(resp.data);
    } catch (err) {
      console.log(err);
      if (isErrUnknown(err)) return notify(errsT("generic"));

      const { data } = (err as any).response;
      if (hasAccessTokenExpired(data)) {
        const { data, err } = await getNewTokens(errsT, notSignedInMsg);
        if (err) return notify(err.msg);

        storeGetNewTokensRespData(data);

        try {
          const resp = await axios[method](url, customBody ?? body);
          setData(resp.data);
        } catch (err) {
          notify(errsT("generic"));
        }
      }
    }

    setLoading(false);
  }

  return { data, err, loading, setLoading, fetch };
}

function getAuthHeader() {
  const accessToken = Cookies.get("accessToken");
  return `Bearer ${accessToken}`;
}
