"use client";
import useFetch from "@/app/hooks/useFetch/useFetch";
import redirToSignInIfNoToken from "@/utils/redirToSignInIfNoToken";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function Notes() {
  const t = useTranslations("Index");
  const { data, err, fetch, loading, setLoading } = useFetch("/notes", {
    method: "get",
  });

  useEffect(() => {
    redirToSignInIfNoToken({ mode: "client" });
  }, []);

  return (
    <div className="flex">
      <LeftSide />
      <RightSide />
    </div>
  );
}
