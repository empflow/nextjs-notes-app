import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { tagSchema } from "@shared/schemas/tag";
import { useQuery } from "@tanstack/react-query";

export default function useTagsQuery() {
  return useQuery(["tags"], fetchTags);
}

async function fetchTags() {
  const { data } = await httpWithAuth.get("/tags");
  return tagSchema.array().parse(data);
}
