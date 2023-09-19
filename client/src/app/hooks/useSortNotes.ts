import { TNotesListNotesMeta } from "@/contexts/NotesContext";
import { useMemo, useState } from "react";
import copyVal from "@shared/utils/copyVal";

export default function useSortNotes(notes: TNotesListNotesMeta) {
  const [sortedNotes, setSortedNotes] = useState<TNotesListNotesMeta>(null);

  useMemo(() => {
    if (!notes) return;
    const unsortedNotesCopy = copyVal(notes);
    console.log("sort");

    const sortedNotes = unsortedNotesCopy.sort((a, b) => {
      const updatedAtA = new Date(a.updatedAt);
      const updatedAtB = new Date(b.updatedAt);

      if (updatedAtA > updatedAtB) return -1;
      if (updatedAtB > updatedAtA) return 1;
      return 0;
    });

    setSortedNotes(sortedNotes);
  }, [notes]);

  return sortedNotes;
}
