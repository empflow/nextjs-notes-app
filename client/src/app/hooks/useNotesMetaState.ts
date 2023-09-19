import { SetState } from "@/utils/types";
import { TNoteMetaSchema } from "@shared/schemas";
import { useEffect, useState } from "react";
import useObserveQuery from "./useObserveQuery";

type TState = TNoteMetaSchema[] | null;

export default function useNotesMetaState(): [TState, SetState<TState>] {
  const {
    data: notesMetaData,
    isLoading,
    isError,
    isFetching,
  } = useObserveQuery<TNoteMetaSchema[]>(["notes"]);
  const [notesMeta, setNotesMeta] = useState<TNoteMetaSchema[] | null>(
    notesMetaData ?? null,
  );

  useEffect(() => {
    if (isLoading || isError || isFetching) return;
    setNotesMeta(notesMetaData);
  }, [isLoading, isFetching]);

  return [notesMeta, setNotesMeta];
}
