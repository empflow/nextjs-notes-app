"use client";
import useFetch from "@/app/hooks/useFetch/useFetch";
import redirToSignInIfNoToken from "@/utils/redirToSignInIfNoToken";
import { useTranslations } from "next-intl";

export default function Notes() {
  const t = useTranslations("Index");
  const { data, err, fetch, loading, setLoading } = useFetch("/notes", {
    method: "get",
  });
  return (
    <div>
      <div>{err && JSON.stringify(err)}</div>
      <div>Loading: {loading}</div>
      <div>Data: {JSON.stringify(data)}</div>
      <button
        className="rounded border border-gray bg-white px-2 py-1"
        onClick={fetch}
      >
        {t("title")}
      </button>
      <div className="w-full border border-black">hello</div>
    </div>
  );
}
