import NotesContext from "@/contexts/NotesContext";
import { TTagSchema } from "@shared/schemas/tag";
import useGetContext from "./useGetContext";
import useObserveQuery from "./useObserveQuery";

export default function useSelectedTag() {
  const { selectedTagId } = useGetContext(NotesContext);
  const { data: tags } = useObserveQuery<TTagSchema[]>(["tags"]);

  if (!tags) return null;
  return tags.find((tag) => tag._id === selectedTagId);
}
