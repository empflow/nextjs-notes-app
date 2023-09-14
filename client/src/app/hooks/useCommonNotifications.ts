import notify from "@/utils/notify";
import { useTranslations } from "next-intl";

export default function useCommonNotifications() {
  const errsT = useTranslations("Errors");

  function notifyGenericErr() {
    notify(errsT("generic"), "error");
  }

  function notifyCouldNotSyncEditorContent() {
    notify(errsT("couldNotSyncEditorContent"), "error");
  }

  return { notifyGenericErr, notifyCouldNotSyncEditorContent };
}
