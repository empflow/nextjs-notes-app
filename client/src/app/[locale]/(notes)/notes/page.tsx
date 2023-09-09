"use client";
import protectedPage from "@/utils/protectedPage";
import { TNote, TNoteMeta, TTag } from "@/utils/types";
import { useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import useNotesMetaQuery from "@/app/hooks/queries/useNotesMetaQuery";
import useObserveQuery from "@/app/hooks/useObserveQuery";
import getSelectedNote from "@/utils/getSelectedNote";

export default function Notes() {
  protectedPage();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { data: notes } = useObserveQuery<TNoteMeta[]>(["notes"]);
  const selectedNote = getSelectedNote(notes, selectedNoteId);

  return (
    <div className="flex min-h-[100dvh]">
      <NotesContext.Provider
        value={{
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
