import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { tagSchema, TTagSchema } from "@shared/schemas/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TProps {
  name: string;
  color: string;
}

interface TContext {
  prevTags: TTagSchema[];
}

export default function useAddTagMutation({ name, color }: TProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation<TTagSchema, Error, TProps, TContext>(addTag, {
    onMutate: async (newTag) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      const prevTags = queryClient.getQueryData<TTagSchema[]>(["tags"]) ?? [];
      queryClient.setQueryData(["tags"], [...prevTags, newTag]);
      return { prevTags };
    },
    onError(_err, _vars, ctx) {
      const prevData = ctx?.prevTags ?? [];
      queryClient.setQueryData(["tags"], [...prevData]);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries(["tags"]);
    },
  });

  async function addTag() {
    const resp = await httpWithAuth.post("/tags/add", { name, color });
    return tagSchema.parse(resp.data);
  }

  return mutation;
}
