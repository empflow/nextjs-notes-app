"use client";

import NotesContext from "@/contexts/NotesContext";
import getSelectedNote from "@/utils/getSelectedNote";
import { ReactNode, useState } from "react";
import useNotesMetaState from "../hooks/useNotesMetaState";
import useSortNotes from "../hooks/useSortNotes";

interface TProps {
  children: ReactNode;
}

export default function NotesContextProviders({ children }: TProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [notes, setNotes] = useNotesMetaState();
  const sortedNotes = useSortNotes(notes);
  const selectedNote = getSelectedNote(notes, selectedNoteId);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        sortedNotes,
        selectedNoteId,
        setSelectedNoteId,
        selectedNote,
        selectedTagId,
        setSelectedTagId,
        isEditing,
        setIsEditing,
        isFilterMenuOpen,
        setIsFilterMenuOpen,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
