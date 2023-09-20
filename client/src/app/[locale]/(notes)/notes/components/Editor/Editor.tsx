"use client";

import useNoteQuery from "@/app/hooks/queries/useNoteQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { ReactNode } from "react";
import EditorContent from "./EditorContent";
import EditorLoading from "./EditorLoading";
import TopElem from "./TopElem/TopElem";

export default function Editor() {
  const { selectedNoteId } = useGetContext(NotesContext);
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteErr,
  } = useNoteQuery();
  let content: ReactNode;

  if (!selectedNoteId) content = <div>Select a note to start editing</div>;
  else if (isNoteErr) content = <div>An error has occurred</div>;
  else {
    let editor: ReactNode;
    if (isNoteLoading) editor = <EditorLoading />;
    else editor = <EditorContent initContent={note.content} />;
    content = (
      <>
        <TopElem createdAt={note?.createdAt} updatedAt={note?.updatedAt} />
        {editor}
      </>
    );
  }

  return (
    <div className="flex flex-grow flex-col p-global sm:p-global-sm">
      {content}
    </div>
  );
}
