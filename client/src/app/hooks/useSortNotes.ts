import { TNotesListNotesMeta } from "@/contexts/NotesContext";

export default function useSortNotes(notes: TNotesListNotesMeta) {
  if (!notes) return null;

  notes.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt);
    const updatedAtB = new Date(b.updatedAt);

    if (updatedAtA > updatedAtB) return -1;
    if (updatedAtB > updatedAtA) return 1;
    return 0;
  });
  return notes;
}
