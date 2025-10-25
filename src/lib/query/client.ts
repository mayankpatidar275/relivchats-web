import { QueryClient, DefaultOptions } from "@tanstack/react-query";
import { UnauthorizedError } from "../api";

const queryConfig: DefaultOptions = {
  queries: {
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error instanceof UnauthorizedError) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: false,
  },
};

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
};
