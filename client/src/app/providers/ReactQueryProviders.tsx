"use client";
import { ReactNode, useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import isDev from "@/utils/isDev";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryCacheOnErr from "@/utils/queryCacheOnErr";

interface TProps {
  children: ReactNode;
}

export default function ReactQueryProviders({ children }: TProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: queryCacheOnErr,
      }),
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      {isDev() && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
}
