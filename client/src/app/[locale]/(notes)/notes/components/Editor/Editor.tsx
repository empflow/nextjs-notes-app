import useNoteQuery from "@/app/hooks/queries/useNoteQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { ReactNode } from "react";
import EditorContent from "./EditorContent";
import TopElem from "./TopElem/TopElem";

export default function Editor() {
  const { selectedNote } = useGetContext(NotesContext);

  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteErr,
  } = useNoteQuery();

  if (!selectedNote) return <div>Select a note to start editing</div>;
  if (isNoteErr) return <div>An error has occurred</div>;

  let content: ReactNode;

  if (isNoteLoading) {
    content = <div>Loading note...</div>;
  } else {
    content = (
      <>
        <TopElem createdAt={note.createdAt} updatedAt={note.updatedAt} />
        <EditorContent initContent={note.content} />
      </>
    );
  }

  return (
    <div className="flex flex-grow flex-col p-global sm:p-global-sm">
      {content}
    </div>
  );
}
