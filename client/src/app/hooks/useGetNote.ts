import { TNoteMetaSchema } from "@shared/schemas/note";
import useObserveQuery from "./useObserveQuery";

export default function useGetNote(id: string): TNoteMetaSchema | null {
  const { data: notes } = useObserveQuery<TNoteMetaSchema[]>(["notes"]);
  const result = notes?.find((note) => note._id === id);
  return result ?? null;
}
