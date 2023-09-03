import httpWithAuth from "@/utils/http/httpWIthAuth";
import { tagSchema } from "@shared/types";
import { useQuery } from "@tanstack/react-query";

export default function useTagsQuery() {
  return useQuery(["tags"], fetchTags);
}

async function fetchTags() {
  const { data } = await httpWithAuth.get("/tags");
  return tagSchema.array().parse(data);
}
