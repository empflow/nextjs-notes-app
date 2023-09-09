import { TNoteMeta } from "./types";

type ReturnT = null | TNoteMeta;

export default function getSelectedNote(
  notes?: TNoteMeta[],
  selectedNoteId?: string | null,
): ReturnT {
  if (!notes || !selectedNoteId) return null;
  const selectedNote = notes.find((note) => note._id === selectedNoteId);
  return selectedNote ?? null;
}
