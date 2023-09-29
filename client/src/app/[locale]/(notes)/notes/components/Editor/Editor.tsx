"use client";

import useNoteQuery from "@/app/hooks/queries/useNoteQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { ReactNode } from "react";
import EditorContent from "./EditorContent";
import EditorLoading from "./EditorLoading";
import TopElem from "./TopElem/TopElem";
import styles from "./editor.module.css";

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
    <div className="relative flex-grow bg-l-secondary p-global pb-0 dark:bg-d-main sm:p-global-sm sm:pb-0">
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-2 overflow-auto ${styles.editorContainerWrapper}`}
      >
        {content}
      </div>
    </div>
  );
}
