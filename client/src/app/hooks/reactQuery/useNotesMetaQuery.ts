import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteMetaSchema, TNoteMetaSchema } from "@shared/schemas/note";
import { useQuery } from "@tanstack/react-query";
import useGetContext from "../useGetContext";

export default function useNotesMetaQuery() {
  const { selectedTagId } = useGetContext(NotesContext);
  return useQuery<TNoteMetaSchema[]>(["notes"], fetchNotesMeta, {
    retry: false,
  });

  async function fetchNotesMeta() {
    const { data } = await httpWithAuth.get(
      `/notes${selectedTagId ? `?tag=${selectedTagId}` : ""}`,
    );
    const notes = noteMetaSchema.array().parse(data);
    return notes;
  }
}
