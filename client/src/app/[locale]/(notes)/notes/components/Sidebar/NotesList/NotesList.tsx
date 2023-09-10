import Err from "@/app/components/Err/Err";
import useNotesMetaQuery from "@/app/hooks/queries/useNotesMetaQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import NotesListLoadingSkeleton from "./LoadingSkeleton";
import Note from "./Note";

export default function NotesList() {
  const {
    isLoading,
    data: notes,
    isError,
    refetch: fetchNotesMeta,
  } = useNotesMetaQuery();
  const { selectedNoteId } = useGetContext(NotesContext);

  if (isLoading) return <NotesListLoadingSkeleton />;
  if (isError) return <Err retryFn={fetchNotesMeta} />;
  if (!notes) return <>No notes</>;
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

// function getNoteDesc(note: TNote) {
//   if (!noteContent || typeof noteContent !== "string") return "";
//   return noteContent.trim().split("\n")[1];
// }
