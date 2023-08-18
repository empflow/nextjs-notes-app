"use client";
import useFetch from "@/app/hooks/useFetch/useFetch";
import redirToSignInIfNoToken from "@/utils/redirToSignInIfNoToken";
import { SetState, TNote, TNoteMeta, TTag } from "@/utils/types";
import { useTranslations } from "next-intl";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import NotesContext from "@/contexts/NotesContext";

export default function Notes() {
  const t = useTranslations("Index");
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
    opts: { fetchImmediately: true },
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
    opts: { fetchImmediately: true },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    redirToSignInIfNoToken({ mode: "client" });
  }, []);

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
        <LeftSide />
        <RightSide />
      </NotesContext.Provider>
    </div>
  );
}
