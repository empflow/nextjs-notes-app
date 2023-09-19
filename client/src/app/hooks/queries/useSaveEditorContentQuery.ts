import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { useMutation } from "@tanstack/react-query";
import { JSONContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import useCommonNotifications from "../useCommonNotifications";
import useGetContext from "../useGetContext";

interface TProps {
  hasContentChanged: boolean;
  content: JSONContent | null;
}

export default function useSaveEditorContent({
  content,
  hasContentChanged,
}: TProps) {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const saveAfterMs = 500;
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
    if (!hasContentChanged) return;
    clearTimeout(saveTimeout.current!);
    saveTimeout.current = setTimeout(async () => {
      await mutation.mutateAsync();
    }, saveAfterMs);
  }, [content]);

  return mutation;
}
