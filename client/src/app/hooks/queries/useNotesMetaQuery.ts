import httpWithAuth from "@/utils/http/httpWIthAuth";
import { noteMetaSchema } from "@shared/types";
import { useQuery } from "@tanstack/react-query";

export default function useNotesMetaQuery() {
  return useQuery(["notes"], fetchNotesMeta);
}

async function fetchNotesMeta() {
  const { data } = await httpWithAuth.get("/notes");
  const notes = noteMetaSchema.array().parse(data);
  return notes;
}