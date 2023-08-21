import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import Note from "./Note";

export default function NotesElems() {
  const { notes, selectedNoteId } = useGetContext(NotesContext);

  if (!notes) return <></>;
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
