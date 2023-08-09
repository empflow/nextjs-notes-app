import axios from "@/config/axios";
import { AxiosError, Method } from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HttpCodes from "@/constants/httpCodes";
import notify from "@/utils/notify";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
}

export default function useFetch(
  url: string,
  { method, body, fetchImmediately, persistDataWhileFetching }: Opts,
) {
  const [err, setErr] = useState<AxiosError | null>(null);
  const [data, setData] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(false);
  const errsT = useTranslations("Errors");

  useEffect(() => {
    if (fetchImmediately) fetch();
  }, []);

  async function fetch(customBody?: any) {
    if (!persistDataWhileFetching) setData(null);
    setErr(null);
    setLoading(true);
    try {
      const resp = await axios[method](url, customBody ?? body);
      setData(resp.data);
    } catch (err) {
      if (!(err instanceof AxiosError)) return;
      if (!navigator.onLine) {
        return notify(errsT("noInternet"));
      }
      if (!err.response) return;

      if (err.response.status === HttpCodes.Unauthorized) {
        const refreshToken = Cookies.get("refreshToken");
        const notSignedInMsg = (
          <>
            {errsT("notSignedIn")}{" "}
            <Link href="/sign-in">{errsT("notSignedInLink")}</Link>
          </>
        );

        if (!refreshToken) notify(errsT(notSignedInMsg));

        try {
          const resp = await axios.post("/auth/get-new-tokens");
          const data = resp;
        } catch (err) {
          notify(<p>You are not signed in</p>);
        }

        if (!refreshToken) setErr(err);
      }

      setErr(err);
    } finally {
      setLoading(false);
    }
  }

  return { data, err, loading, setLoading, fetch };
}
