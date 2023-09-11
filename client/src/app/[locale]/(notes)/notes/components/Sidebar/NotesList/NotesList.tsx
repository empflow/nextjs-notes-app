import Err from "@/app/components/Err/Err";
import RepeatingElem from "@/app/components/RepeatingElem";
import useNotesMetaQuery from "@/app/hooks/queries/useNotesMetaQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import getIterable from "@/utils/getIterable";
import Note from "./Note";

export default function NotesList() {
  const {
    isLoading,
    data: notes,
    isError,
    refetch: fetchNotesMeta,
  } = useNotesMetaQuery();
  const { selectedNoteId } = useGetContext(NotesContext);

  if (isLoading) return <NotesListLoading />;
  if (isError) return <Err retryFn={fetchNotesMeta} />;
  if (!notes) return <>No notes</>;
  return (
    <>
      {notes.map((note, i, notes) => {
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
