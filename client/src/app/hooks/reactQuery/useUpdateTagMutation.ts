import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import {
  booleanRespSchema,
  TBooleanResp,
} from "@shared/respSchemas/booleanResp";
import { TTagSchema } from "@shared/schemas/tag";
import copyVal from "@shared/utils/copyVal";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type TProps = {
  color: string;
  name: string;
  tagId: string;
};

interface TContext {
  prevTags: TTagSchema[];
}

export default function useUpdateTagMutation() {
  const qc = useQueryClient();
  const t = useTranslations("Tags");

  const updateTag: MutationFunction<TBooleanResp, TProps> = async ({
    color,
    name,
    tagId,
  }) => {
    const payload = { color, name };
    const resp = await httpWithAuth.patch(`/tags/${tagId}`, payload);
    return booleanRespSchema.parse(resp.data);
  };

  const mutation = useMutation<TBooleanResp, Error, TProps, TContext>(
    updateTag,
    {
      onMutate({ color, name, tagId }) {
        const prevTags = qc.getQueryData<TTagSchema[]>(["tags"]) ?? [];
        const tagsUpdated = prevTags.map((tag) => {
          if (tag._id !== tagId) return tag;
          tag.color = color;
          tag.name = name;
          return tag;
        });
        console.log(tagsUpdated);

        qc.setQueryData(["tags"], tagsUpdated);
        return { prevTags };
      },
      onError(_, __, context) {
        qc.setQueryData(["tags"], context?.prevTags ?? []);
        notify(t("couldNotUpdateTag"), "error");
      },
      onSettled: () => {
        qc.invalidateQueries(["tags"]);
      },
    },
  );

  return mutation;
}
