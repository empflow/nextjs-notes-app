import axios from "@/config/axios";
import { AxiosError, Method } from "axios";
import { useEffect, useState } from "react";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

// fn to trigger req
// err state (typeof Error)
// response data
// status code

interface Opts {
  method: HttpMethod;
  body?: any;
  fetchImmediately?: boolean;
}
export default function useFetch(
  url: string,
  { method, body, fetchImmediately }: Opts
) {
  const [err, setErr] = useState<AxiosError | null>(null);
  const [data, setData] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fetchImmediately) fetch();
  }, []);

  async function fetch(customBody?: any) {
    setLoading(true);
    try {
      const resp = await axios[method](url, customBody ?? body);
      setData(resp.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr(err);
      }
    } finally {
      setLoading(false);
    }
  }

  return { data, err, loading, setLoading, fetch };
}
