import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteMetaSchema, TNoteMetaSchema } from "@shared/schemas/note";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useGetContext from "../useGetContext";

export default function useNotesMetaQuery() {
  const { selectedTagId, setIsNotesFiltering } = useGetContext(NotesContext);
  const query = useQuery<TNoteMetaSchema[]>(["notes"], fetchNotesMeta, {
    retry: false,
  });

  useEffect(() => {
    (async () => {
      setIsNotesFiltering(true);
      await query.refetch();
      setIsNotesFiltering(false);
    })();
  }, [selectedTagId]);

  async function fetchNotesMeta() {
    const { data } = await httpWithAuth.get(
      `/notes${selectedTagId ? `?tag=${selectedTagId}` : ""}`,
    );
    const notes = noteMetaSchema.array().parse(data);
    return notes;
  }

  return query;
}
