import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import {
  booleanRespSchema,
  TBooleanResp,
} from "@shared/respSchemas/booleanResp";
import { tagSchema, TTagSchema } from "@shared/schemas/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type TProps = string;

interface TContext {
  prevTags: TTagSchema[];
}

export default function useDeleteTagMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("Tags");
  const mutation = useMutation<TBooleanResp, Error, TProps, TContext>(
    deleteTag,
    {
      onMutate: async (_id) => {
        await queryClient.cancelQueries({ queryKey: ["tags"] });
        const prevTags = queryClient.getQueryData<TTagSchema[]>(["tags"]) ?? [];

        const updatedTags = prevTags.filter((tag) => tag._id !== _id);
        queryClient.setQueryData(["tags"], updatedTags);

        return { prevTags };
      },
      onError(_err, _vars, ctx) {
        const prevData = ctx?.prevTags ?? [];
        queryClient.setQueryData(["tags"], [...prevData]);
        notify(t("couldNotDeleteTag"), "error");
      },
      onSettled: async () => {
        return await queryClient.invalidateQueries(["tags"]);
      },
    },
  );

  async function deleteTag(_id: string) {
    const resp = await httpWithAuth.delete(`/tags/${_id}`);
    return booleanRespSchema.parse(resp.data);
  }

  return mutation;
}
