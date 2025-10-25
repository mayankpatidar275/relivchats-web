"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { createQueryClient } from "./client";
import { clientApi } from "../api";
import { useAuth } from "@clerk/nextjs";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());
  const { getToken } = useAuth();

  // Set the token getter for the client API
  // This runs once when the provider mounts
  if (typeof window !== "undefined") {
    clientApi.setTokenGetter(getToken);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
