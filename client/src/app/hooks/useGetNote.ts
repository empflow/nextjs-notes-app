import NotesContext from "@/contexts/NotesContext";
import { TNoteMetaSchema } from "@shared/schemas/note";
import useGetContext from "./useGetContext";

export default function useGetNote(id: string): TNoteMetaSchema | null {
  const { notes } = useGetContext(NotesContext);
  const result = notes?.find((note) => note._id === id);
  return result ?? null;
}
