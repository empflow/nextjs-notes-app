import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import {
  booleanRespSchema,
  TBooleanResp,
} from "@shared/respSchemas/booleanResp";
import { noteSchema, TNoteSchema } from "@shared/schemas/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type TProps = {
  _id: string;
};

interface TContext {
  prevNotes: TNoteSchema[];
}

export default function useDeleteNoteMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("Notes");
  const mutation = useMutation<TBooleanResp, Error, TProps, TContext>(
    deleteNote,
    {
      onMutate: async ({ _id }) => {
        await queryClient.cancelQueries({ queryKey: ["notes"] });
        const prevNotes =
          queryClient.getQueryData<TNoteSchema[]>(["notes"]) ?? [];

        const updatedNotes = prevNotes.filter((note) => note._id !== _id);
        queryClient.setQueryData(["notes"], updatedNotes);

        return { prevNotes };
      },
      onError(_err, _vars, ctx) {
        const prevData = ctx?.prevNotes ?? [];
        queryClient.setQueryData(["notes"], [...prevData]);
        notify(t("couldNotDeleteNote"), "error");
      },
      onSettled: async () => {
        return await queryClient.invalidateQueries(["tags"]);
      },
    },
  );

  async function deleteNote({ _id }: TProps) {
    const resp = await httpWithAuth.delete(`/notes/${_id}`);
    return booleanRespSchema.parse(resp.data);
  }

  return mutation;
}
