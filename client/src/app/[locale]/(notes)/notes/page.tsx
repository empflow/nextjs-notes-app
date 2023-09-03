"use client";
import useFetch from "@/app/hooks/useFetch";
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
  const {
    data: tags,
    setData: setTags,
    err: tagsErr,
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
          selectedNoteId,
          setSelectedNoteId,

          tags,
          setTags,
          tagsLoading,
          tagsErr,
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
