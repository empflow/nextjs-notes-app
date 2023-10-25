"use client";
import NotesContext, { TEditor } from "@/contexts/NotesContext";
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
  const [tags, _setTags] = useState([]);
  const [editor, setEditor] = useState<TEditor>(null);
  const sortedNotes = useSortNotes(notes);
  const selectedNote = getSelectedNote(notes, selectedNoteId);
  const [hideEditorOnMobile, setHideEditorOnMobile] = useState(false);

  return (
    <NotesContext.Provider
      value={{
        editor,
        setEditor,
        notes,
        setNotes,
        sortedNotes,
        selectedNoteId,
        setSelectedNoteId,
        selectedNote,
        tags,
        selectedTagId,
        setSelectedTagId,
        isEditing,
        setIsEditing,
        isFilterMenuOpen,
        setIsFilterMenuOpen,
        hideEditorOnMobile,
        setHideEditorOnMobile,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
