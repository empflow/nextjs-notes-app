import { useQuery } from "@tanstack/react-query";

export default function observeQuery<TData>(queryKey: string[]) {
  return useQuery<TData>(queryKey, { enabled: false });
}
