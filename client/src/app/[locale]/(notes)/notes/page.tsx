"use client";
import useFetch from "@/app/hooks/useFetch/useFetch";
import redirToSignInIfNoToken from "@/utils/redirToSignInIfNoToken";
import { TNote, TTag } from "@/utils/types";
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

interface TNotesContextValue {
  notes: TNote[] | null;
  setNotes: Dispatch<SetStateAction<null | TNote[]>>;
  tags: TTag[] | null;
  setTags: Dispatch<SetStateAction<null | TTag[]>>;
}

type TNotesContext = null | TNotesContextValue;

const NotesContext = createContext<TNotesContext>(null);

export default function Notes() {
  const t = useTranslations("Index");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const {
    data: notes,
    setData: setNotes,
    err: notesErr,
    fetch: fetchNotes,
    loading: notesLoading,
  } = useFetch<TNote[]>("/notes", {
    method: "get",
    fetchImmediately: true,
  });
  const {
    data: tags,
    setData: setTags,
    err: tagsErr,
    fetch: tagsFetch,
  } = useFetch<TTag[]>("/tags", {
    method: "get",
    fetchImmediately: true,
  });

  useEffect(() => {
    redirToSignInIfNoToken({ mode: "client" });
  }, []);

  return (
    <div className="flex min-h-[100dvh]">
      <NotesContext.Provider value={{ notes: notes, setNotes, tags, setTags }}>
        <LeftSide />
        <RightSide />
      </NotesContext.Provider>
    </div>
  );
}
