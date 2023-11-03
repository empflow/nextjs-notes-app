import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import notify from "@/utils/notify";
import { tagSchema, TTagSchema } from "@shared/schemas/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useTranslations } from "next-intl";

interface TProps {
  name: string;
  color: string;
}

interface TContext {
  prevTags: TTagSchema[];
}

export default function useAddTagMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("Tags");

  const mutation = useMutation<TTagSchema, Error, TProps, TContext>(addTag, {
    onMutate: async (newTagData) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      const prevTags = queryClient.getQueryData<TTagSchema[]>(["tags"]) ?? [];
      const newTag: TTagSchema = { ...newTagData, owner: "", _id: nanoid(24) };
      queryClient.setQueryData<TTagSchema[]>(["tags"], [...prevTags, newTag]);
      return { prevTags };
    },
    onError(_err, _vars, ctx) {
      const prevData = ctx?.prevTags ?? [];
      queryClient.setQueryData(["tags"], [...prevData]);
      notify(t("couldNotAddTag"), "error");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries(["tags"]);
    },
  });

  async function addTag({ color, name }: TProps) {
    const resp = await httpWithAuth.post("/tags/add", { name, color });
    return tagSchema.parse(resp.data);
  }

  return mutation;
}
