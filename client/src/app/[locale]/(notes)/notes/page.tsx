"use client";
import protectedPage from "@/utils/protectedPage";
import { useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import getSelectedNote from "@/utils/getSelectedNote";
import useNotesMetaState from "@/app/hooks/useNotesMetaState";
import useSortNotes from "@/app/hooks/useSortNotes";

export default function Notes() {
  protectedPage();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [notes, setNotes] = useNotesMetaState();
  const sortedNotes = useSortNotes(notes);
  const selectedNote = getSelectedNote(notes, selectedNoteId);

  return (
    <div className="flex min-h-[100dvh]">
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
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <Editor />
        </div>
      </NotesContext.Provider>
    </div>
  );
}
