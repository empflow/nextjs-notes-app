import { useQuery } from "@tanstack/react-query";

export default function useObserveQuery<TData = unknown>(queryKey: string[]) {
  return useQuery<TData>(queryKey, { enabled: false });
}
