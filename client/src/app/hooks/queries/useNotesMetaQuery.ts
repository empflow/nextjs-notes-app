import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteMetaSchema, TNoteMetaSchema } from "@shared/schemas/note";
import { useQuery } from "@tanstack/react-query";

export default function useNotesMetaQuery() {
  return useQuery<TNoteMetaSchema[]>(["notes"], fetchNotesMeta, {
    retry: false,
  });
}

async function fetchNotesMeta() {
  const { data } = await httpWithAuth.get("/notes");
  const notes = noteMetaSchema.array().parse(data);
  return notes;
}
