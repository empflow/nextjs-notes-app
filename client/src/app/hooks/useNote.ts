import NotesContext from "@/contexts/NotesContext";
import useGetContext from "./useGetContext";

export default function useNote() {
  const { setHideEditorOnMobile, setSelectedNoteId } =
    useGetContext(NotesContext);

  function selectNote(noteId: string) {
    setSelectedNoteId(noteId);
    setHideEditorOnMobile(false);
  }

  function deselectSelectedNote() {
    setHideEditorOnMobile(true);
    setTimeout(() => setSelectedNoteId(null), 200);
  }

  return { selectNote, deselectSelectedNote };
}
