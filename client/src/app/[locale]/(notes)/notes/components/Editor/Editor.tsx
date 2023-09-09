import useNoteQuery from "@/app/hooks/queries/useNoteQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useState } from "react";
import EditorContent from "./EditorContent";

type TTopElem = "createdAt" | "modifiedAt";

export default function Editor() {
  const [topElem, setTopElem] = useState<TTopElem>("createdAt");
  const { selectedNote } = useGetContext(NotesContext);

  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteErr,
  } = useNoteQuery();

  if (!selectedNote) return <div>Select a note to start editing</div>;
  if (isNoteErr) return <div>An error has occurred</div>;

  return (
    <div className="flex flex-grow flex-col p-global sm:p-global-sm">
      <div className="flex justify-center text-dark-gray dark:text-gray">
        some data
      </div>
      {isNoteLoading ? (
        <div>Loading note...</div>
      ) : (
        <EditorContent initContent={note.content} />
      )}
    </div>
  );
}
