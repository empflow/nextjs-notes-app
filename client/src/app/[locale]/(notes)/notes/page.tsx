"use client";
import protectedPage from "@/utils/protectedPage";
import { TNoteMeta, TTag } from "@/utils/types";
import { useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import useNotesMetaQuery from "@/app/hooks/queries/useNotesMetaQuery";

export default function Notes() {
  protectedPage();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh]">
      <NotesContext.Provider
        value={{
          selectedNoteId,
          setSelectedNoteId,
          selectedTagId,
          setSelectedTagId,
          isEditing,
          setIsEditing,
          isFilterMenuOpen,
          setIsFilterMenuOpen,
        }}
      >
        <Sidebar />
        <div>
          <Header />
          <Editor />
        </div>
      </NotesContext.Provider>
    </div>
  );
}
