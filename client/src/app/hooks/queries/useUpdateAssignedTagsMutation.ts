import { convertNoteToNoteMeta } from "@/utils/convertNoteToNoteMeta";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import removeDuplicates from "@/utils/removeDuplicates";
import {
  booleanRespSchema,
  TBooleanResp,
} from "@shared/respSchemas/booleanResp";
import { TNoteMetaSchema, TNoteSchema } from "@shared/schemas/note";
import copyVal from "@shared/utils/copyVal";
import {
  MutateFunction,
  MutationFunction,
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type TUpdateAssignedTagsAction = "assign" | "unassign";

type TProps = {
  noteId: string;
  tagId: string;
  action: TUpdateAssignedTagsAction;
};

interface TContext {
  prevNotes: TNoteMetaSchema[];
}

export default function useUpdateAssignedTagsMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("Tags");

  const updateAssignedTags: MutationFunction<TBooleanResp, TProps> = async ({
    noteId,
  }) => {
    const updatedNote = queryClient
      .getQueryData<TNoteMetaSchema[]>(["notes"])
      ?.find((note) => note._id === noteId);
    if (!updatedNote) throw new Error();
    const resp = await httpWithAuth.patch(`/notes/${noteId}`, updatedNote);
    return booleanRespSchema.parse(resp.data);
  };

  const mutation = useMutation<TBooleanResp, Error, TProps, TContext>(
    updateAssignedTags,
    {
      onMutate: async ({ action, noteId, tagId }) => {
        await queryClient.cancelQueries({ queryKey: ["notes"] });
        const prevNotes = getNotesQueryData();

        const updatedNotes = updateNotes({
          notes: prevNotes,
          noteToUpdateId: noteId,
          action,
          tagId,
        });
        queryClient.setQueryData(["notes"], updatedNotes);

        return { prevNotes };
      },
      onError(_err, _vars, ctx) {
        const prevData = ctx?.prevNotes ?? [];
        queryClient.setQueryData(["notes"], [...prevData]);
        notify(t("couldNotAssignTag"), "error");
      },
      onSettled: async () => {
        return await queryClient.invalidateQueries(["notes"]);
      },
    },
  );

  function findNote({
    noteId,
    notes,
  }: {
    noteId: string;
    notes: TNoteMetaSchema[];
  }) {
    return notes?.find((note) => note._id === noteId);
  }

  function findNoteIndex({
    noteId,
    notes,
  }: {
    noteId: string;
    notes: TNoteMetaSchema[];
  }) {
    return notes?.findIndex((note) => note._id === noteId);
  }

  function getNotesQueryData(): TNoteMetaSchema[] {
    return queryClient.getQueryData<TNoteMetaSchema[]>(["notes"]) ?? [];
  }

  function updateNotes({
    noteToUpdateId,
    notes,
    action,
    tagId,
  }: {
    noteToUpdateId: string;
    notes: TNoteMetaSchema[];
    action: TUpdateAssignedTagsAction;
    tagId: string;
  }) {
    const noteToUpdate = findNote({
      noteId: noteToUpdateId,
      notes,
    }) as TNoteMetaSchema;
    const noteToUpdateIndex = findNoteIndex({
      noteId: noteToUpdateId,
      notes: notes,
    });
    const updatedNote = getUpdatedNote({
      note: noteToUpdate,
      action,
      tagId,
    });
    const notesCopy = copyVal(notes);
    notesCopy.splice(noteToUpdateIndex, 1, updatedNote);
    return notesCopy;
  }

  function getUpdatedNote({
    note,
    action,
    tagId,
  }: {
    note: TNoteMetaSchema;
    action: TUpdateAssignedTagsAction;
    tagId: string;
  }) {
    const noteCopy = copyVal(note);

    if (action === "assign") noteCopy.tags = [...noteCopy.tags, tagId];
    else noteCopy.tags = noteCopy.tags.filter((tag) => tag !== tagId);

    return noteCopy;
  }

  return mutation;
}
