import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import Note, { NoteSkeleton } from "./Note";
import arrOfLength from "@/utils/arrOfLength";
import { useErrorBoundary } from "react-error-boundary";

export default function NotesElems() {
  const { notes, notesErr, notesLoading, selectedNoteId } =
    useGetContext(NotesContext);

  if (notesLoading)
    return (
      <>
        {arrOfLength(15).map((item, i) => (
          <NoteSkeleton key={i} />
        ))}
      </>
    );
  if (!notes) return <>hello</>;
  return (
    <>
      {notes.map((note, i, notes) => {
        const { _id, title } = note;
        // TODO: add proper descriptions
        // const desc = getNoteDesc(content);
        const desc = `description ${i}`;

        const isSelected = selectedNoteId === _id;
        const nextNote = notes[i + 1];
        const isAboveSelectedNote = nextNote && selectedNoteId === nextNote._id;
        return (
          <Note
            {...{ title, desc, isSelected, isAboveSelectedNote, _id }}
            key={i}
          />
        );
      })}
    </>
  );
}

function getNoteDesc(noteContent: string | unknown) {
  if (!noteContent || typeof noteContent !== "string") return "";
  return noteContent.trim().split("\n")[1];
}
