import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import { noteSchema, TNoteMetaSchema, TNoteSchema } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import useGetContext from "../useGetContext";

export default function useAddNewNoteMutation() {
  const { setSelectedNoteId } = useGetContext(NotesContext);
  const errsT = useTranslations("Errors");
  const queryClient = useQueryClient();

  return useMutation<TNoteSchema>(addNote, {
    onSuccess(newData) {
      const newNote = convertNoteToNoteMeta(newData);
      queryClient.setQueryData<TNoteMetaSchema[]>(["notes"], (prevData) => {
        if (!prevData) return [newNote];
        return [...prevData, newNote];
      });
      setSelectedNoteId(newNote._id);
    },
    onError() {
      notify(errsT("couldNotAddNote"), "error");
    },
    onSettled() {
      queryClient.invalidateQueries(["notes"]);
    },
  });
}

async function addNote() {
  const { data } = await httpWithAuth.post("/notes/add");
  return noteSchema.parse(data);
}

function convertNoteToNoteMeta(note: TNoteSchema): TNoteMetaSchema {
  const { content: _, ...noteMeta } = note;
  return noteMeta;
}
