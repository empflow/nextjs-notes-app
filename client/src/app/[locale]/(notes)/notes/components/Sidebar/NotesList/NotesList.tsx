import Err from "@/app/components/Err/Err";
import RepeatingElem from "@/app/components/RepeatingElem";
import useNotesMetaQuery from "@/app/hooks/queries/useNotesMetaQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import Note from "./Note";

export default function NotesList() {
  const { isLoading, isError, refetch: fetchNotesMeta } = useNotesMetaQuery();
  const { selectedNoteId, notes, sortedNotes } = useGetContext(NotesContext);

  if (isLoading) return <NotesListLoading />;
  if (isError) return <Err retryFn={fetchNotesMeta} />;
  if (!notes?.length) return <>No notes</>;
  return (
    <>
      {sortedNotes?.map((note, i, notes) => {
        const { _id, title, description } = note;

        const isSelected = selectedNoteId === _id;
        const nextNote = notes[i + 1];
        const isAboveSelectedNote = nextNote && selectedNoteId === nextNote._id;
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

function NotesListLoading() {
  return <RepeatingElem count={10} elem={<Note state="loading" />} />;
}
