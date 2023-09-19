import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteSchema } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";
import useGetContext from "../useGetContext";

export default function useNoteQuery() {
  const { selectedNoteId } = useGetContext(NotesContext);

  const query = useQuery(
    ["notes", selectedNoteId],
    () => fetchNote(selectedNoteId!),
    { enabled: !!selectedNoteId },
  );

  return query;
}

async function fetchNote(noteId: string) {
  const { data } = await httpWithAuth.get(`/notes/${noteId}`);
  return noteSchema.parse(data);
}
