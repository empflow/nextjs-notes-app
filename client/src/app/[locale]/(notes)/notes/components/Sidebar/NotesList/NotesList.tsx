"use client";

import Err from "@/app/components/Err/Err";
import RepeatingElem from "@/app/components/RepeatingElem";
import useNotesMetaQuery from "@/app/hooks/reactQuery/useNotesMetaQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { ReactNode } from "react";
import AssignTagModal from "./AssignTagModal/AssignTagModal";
import Note from "./Note";

export default function NotesList() {
  const {
    isLoading,
    isError,
    refetch: fetchNotesMeta,
    isInitialLoading,
    isFetching,
  } = useNotesMetaQuery();
  const { selectedNoteId, notes, sortedNotes } = useGetContext(NotesContext);
  const isNotesFiltering = !isInitialLoading && isFetching;
  let content: ReactNode;

  if (isLoading || isNotesFiltering) content = <NotesListLoading />;
  else if (isError) content = <Err retryFn={fetchNotesMeta} />;
  else if (!notes?.length) content = <>No notes</>;
  else {
    content = (
      <>
        <AssignTagModal />
        {sortedNotes?.map((note, i, notes) => {
          const { _id, title, description } = note;
          const isSelected = selectedNoteId === _id;
          const nextNote = notes[i + 1];
          const isAboveSelectedNote =
            nextNote && selectedNoteId === nextNote._id;
          return (
            <Note
              {...{
                title,
                description,
                isSelected,
                isAboveSelectedNote,
                _id,
              }}
              key={_id}
            />
          );
        })}
      </>
    );
  }

  return <div className="flex flex-grow flex-col p-5">{content}</div>;
}

function NotesListLoading() {
  return <RepeatingElem count={10} elem={<Note state="loading" />} />;
}
