import { useQuery } from "@tanstack/react-query";

export default function useObserveQuery<TData>(queryKey: string[]) {
  return useQuery<TData>(queryKey, { enabled: false });
}
