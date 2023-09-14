"use client";
import notify from "@/utils/notify";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { ToastOptions } from "react-toastify";

interface TProps {
  editorWarning?: boolean;
}

export default function NetworkStatusListener({
  editorWarning = false,
}: TProps) {
  const t = useTranslations("NetworkStatusListener");

  function handleOnlineStatusChange() {
    notify(t("online"), "success");
  }

  function handleOfflineStatusChange() {
    const offlineWarning = `. ${t("editorWarning")}`;
    const content = `${t("offline")}${editorWarning ? offlineWarning : ""}`;
    const opts = getHandleOfflineStatusChangeNotificationOpts(editorWarning);
    notify(content, undefined, opts);
  }

  useEffect(() => {
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOfflineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOfflineStatusChange);
    };
  }, []);

  return null;
}

function getHandleOfflineStatusChangeNotificationOpts(
  editorWarning: boolean,
): ToastOptions {
  const closeAfterMs = 5000;
  let opts: ToastOptions = {};
  if (editorWarning) opts.autoClose = closeAfterMs;
  return opts;
}
