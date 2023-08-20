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

export default function SidebarNotesList() {
  const context = useGetContext(NotesContext);
  const { notes, selectedNoteId, setSelectedNoteId } = context;
  const t = useTranslations("Notes");

  const notesElems =
    notes?.map((note, i, notes) => {
      const { _id, title } = note;
      // TODO: add proper descriptions
      // const desc = getNoteDesc(content);
      const desc = `description ${i}`;

      const isSelected = selectedNoteId === _id;
      const nextNote = notes[i + 1];
      const isAboveSelectedNote = nextNote && selectedNoteId === nextNote._id;
      const props = {
        title,
        desc,
        isSelected,
        setSelectedNoteId,
        isAboveSelectedNote,
        _id,
      };
      return <Note {...props} key={i} />;
    }) ?? null;

  return (
    <div className="flex flex-grow flex-col gap-3">
      {!notes?.length ? (
        <div className="flex-grow">
          <div className="flex h-full items-center justify-center text-center text-xl text-light-gray">
            {t("noNotes")}
          </div>
        </div>
      ) : (
        <>
          <div>
            <EditBtn />
          </div>
          <div>{notesElems}</div>
        </>
      )}
    </div>
  );
}

function getNoteDesc(noteContent: string | unknown) {
  if (!noteContent || typeof noteContent !== "string") return "";
  return noteContent.trim().split("\n")[1];
}
