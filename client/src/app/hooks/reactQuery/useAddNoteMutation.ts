import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import { noteSchema, TNoteMetaSchema, TNoteSchema } from "@shared/schemas/note";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import useGetContext from "../useGetContext";
import { convertNoteToNoteMeta } from "../../../utils/convertNoteToNoteMeta";

export default function useAddNoteMutation() {
  const { setSelectedNoteId, selectedTagId } = useGetContext(NotesContext);
  const errsT = useTranslations("Errors");
  const queryClient = useQueryClient();

  return useMutation<TNoteSchema, Error>(addNote, {
    onSuccess(newNote) {
      const newNoteMeta = convertNoteToNoteMeta(newNote);
      queryClient.setQueryData<TNoteMetaSchema[]>(["notes"], (prevData) => {
        if (!prevData) return [newNoteMeta];
        return [...prevData, newNoteMeta];
      });
      queryClient.setQueryData<TNoteSchema>(["notes", newNote._id], newNote);
      setSelectedNoteId(newNote._id);
    },
    onError() {
      notify(errsT("couldNotAddNote"), "error");
    },
    onSettled() {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  async function addNote() {
    let payload: undefined | Partial<TNoteSchema> = {};
    if (selectedTagId) payload.tags = [selectedTagId];

    const { data } = await httpWithAuth.post("/notes/add", {
      tags: selectedTagId ? [selectedTagId] : undefined,
    });
    return noteSchema.parse(data);
  }
}
