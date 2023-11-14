import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import useGetContext from "./useGetContext";

export default function useFilterNotes() {
  const { setSelectedTagId, setIsFilterMenuOpen } = useGetContext(NotesContext);

  function filter(tagId: string) {
    setSelectedTagId(tagId);
    setIsFilterMenuOpen(false);
  }

  return filter;
}
