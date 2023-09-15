import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { useMutation } from "@tanstack/react-query";
import { JSONContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import useCommonNotifications from "../useCommonNotifications";
import useGetContext from "../useGetContext";

export default function useSaveEditorContent(content: JSONContent | null) {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const saveAfterMs = 1000;
  const { selectedNote } = useGetContext(NotesContext);
  const { notifyCouldNotSyncEditorContent } = useCommonNotifications();
  const mutation = useMutation(saveEditorContent, {
    onError: notifyCouldNotSyncEditorContent,
  });

  async function saveEditorContent() {
    if (!selectedNote || !content) return;
    return httpWithAuth.patch(`/notes/${selectedNote._id}`, { content });
  }

  useEffect(() => {
    clearTimeout(saveTimeout.current!);

    saveTimeout.current = setTimeout(async () => {
      await mutation.mutateAsync();
    }, saveAfterMs);
  }, [content]);

  return mutation;
}
