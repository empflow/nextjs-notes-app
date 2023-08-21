"use client";
import useFetch from "@/app/hooks/useFetch/useFetch";
import protectedPage from "@/utils/protectedPage";
import { TNoteMeta, TTag } from "@/utils/types";
import { useEffect, useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";

export default function Notes() {
  protectedPage({ mode: "client" });
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const {
    data: notes,
    setData: setNotes,
    err: notesErr,
    fetch: fetchNotes,
    loading: notesLoading,
  } = useFetch<TNoteMeta[]>({
    url: "/notes",
    method: "get",
    opts: { fetchImmediately: true, redirIfNoAuth: true },
  });
  const {
    data: tags,
    setData: setTags,
    err: tagsErr,
    fetch: fetchTags,
    loading: tagsLoading,
  } = useFetch<TTag[]>({
    url: "/tags",
    method: "get",
    opts: { fetchImmediately: true, redirIfNoAuth: true },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh]">
      <NotesContext.Provider
        value={{
          notes,
          setNotes,
          selectedNoteId,
          setSelectedNoteId,

          tags,
          setTags,
          selectedTagId,

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
