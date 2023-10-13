import { TNoteMetaSchema } from "@shared/schemas/note";

type ReturnT = null | TNoteMetaSchema;

export default function getSelectedNote(
  notes: TNoteMetaSchema[] | null,
  selectedNoteId?: string | null,
): ReturnT {
  if (!notes || !selectedNoteId) return null;
  const selectedNote = notes.find((note) => note._id === selectedNoteId);
  return selectedNote ?? null;
}
