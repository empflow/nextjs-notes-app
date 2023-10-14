import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { useQuery } from "@tanstack/react-query";
import { viewMediaFileRespSchema } from "@shared/respSchemas/viewMediaFile";

export default function useMediaFileQuery(id: string | null) {
  const query = useQuery(["img", id], fetchImg, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  async function fetchImg() {
    const resp = await httpWithAuth.get(`/media/view/${id}`);
    return viewMediaFileRespSchema.parse(resp.data);
  }

  return query;
}
