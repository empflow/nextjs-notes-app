import NotesContext from "@/contexts/NotesContext";
import { useEffect } from "react";
import useNotesMetaQuery from "./reactQuery/useNotesMetaQuery";
import useGetContext from "./useGetContext";

export default function useFilterNotes() {
  const { setSelectedTagId, selectedTagId, setIsFilterMenuOpen } =
    useGetContext(NotesContext);
  const { refetch: refetchNotes } = useNotesMetaQuery();

  function filter(tagId: string) {
    setSelectedTagId(tagId);
    setIsFilterMenuOpen(false);
  }

  useEffect(() => {
    if (!selectedTagId) return;
    refetchNotes();
  }, [selectedTagId]);

  return filter;
}
