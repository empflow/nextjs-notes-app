import BigBtn from "@/app/components/buttons/Big";
import MediumBtn from "@/app/components/buttons/Medium";
import SmallBtn from "@/app/components/buttons/Small";
import TinyBtn from "@/app/components/buttons/Tiny";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";

import { TWidth } from "@/utils/types";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import EditBtn from "./EditBtn";
import Note from "./Note";
import NotesElems from "./NotesElems";

export default function NotesList() {
  const context = useGetContext(NotesContext);
  const { notes, selectedNoteId, setSelectedNoteId, notesLoading } = context;
  const t = useTranslations("Notes");

  return (
    <div className="flex flex-grow flex-col gap-3">
      {!notes?.length ? (
        <></>
      ) : (
        <>
          <div>
            <NotesElems />
          </div>
        </>
      )}
    </div>
  );
}

function getNoteDesc(noteContent: string | unknown) {
  if (!noteContent || typeof noteContent !== "string") return "";
  return noteContent.trim().split("\n")[1];
}
