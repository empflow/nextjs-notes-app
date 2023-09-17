import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteMetaSchema, TNoteMetaSchema } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";

export default function useNotesMetaQuery() {
  return useQuery<TNoteMetaSchema[]>(["notes"], fetchNotesMeta, {
    retry: false,
    select: selectNotes,
  });
}

function selectNotes(notes: TNoteMetaSchema[]) {
  notes.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt);
    const updatedAtB = new Date(b.updatedAt);
    if (updatedAtA > updatedAtB) return -1;
    if (updatedAtB > updatedAtA) return 1;
    return 0;
  });
  return notes;
}

async function fetchNotesMeta() {
  const { data } = await httpWithAuth.get("/notes");
  const notes = noteMetaSchema.array().parse(data);
  return notes;
}
