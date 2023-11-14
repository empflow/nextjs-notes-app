"use client";
import NotesContext, { TEditor } from "@/contexts/NotesContext";
import getSelectedNote from "@/utils/getSelectedNote";
import { ReactNode, useState } from "react";
import useNotesMetaState from "../hooks/useNotesMetaState";

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
  const selectedNote = getSelectedNote(notes, selectedNoteId);
  const [hideEditorOnMobile, setHideEditorOnMobile] = useState(true);
  const [isAssignTagModalOpen, setIsAssignTagModalOpen] = useState(false);
  const [assignTagModalNoteId, setAssignTagModalNoteId] = useState<
    string | null
  >(null);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isNotesFiltering, setIsNotesFiltering] = useState(false);

  return (
    <NotesContext.Provider
      value={{
        isNotesFiltering,
        setIsNotesFiltering,
        isAddTagModalOpen,
        setIsAddTagModalOpen,
        isAssignTagModalOpen,
        setIsAssignTagModalOpen,
        assignTagModalNoteId,
        setAssignTagModalNoteId,
        editor,
        setEditor,
        notes,
        setNotes,
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
