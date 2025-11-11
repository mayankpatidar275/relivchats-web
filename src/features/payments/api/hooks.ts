// src/features/payments/api/hooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentsApi } from "./queries";
import { paymentsMutations } from "./mutations";
import { CreateOrderRequest, OrderStatusResponse } from "../types";
import type { Query } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";

export const useCreatePaymentOrder = () => {
  return useMutation({
    mutationFn: async (data: CreateOrderRequest) =>
      paymentsMutations.createPaymentOrder(data),
  });
};

export const useOrderStatus = (orderId: string) => {
  const key = orderId
    ? queryKeys.payments.orderStatus(orderId)
    : (["payments", "orders", "status", ""] as const);

  return useQuery<OrderStatusResponse, Error>({
    queryKey: key,
    queryFn: () => paymentsApi.getOrderStatus(orderId),
    enabled: !!orderId,
    /**
     * refetchInterval expects either a number | false or a function that receives the Query object.
     * Access the fetched data via `query.state.data`.
     */
    refetchInterval: (query: Query<OrderStatusResponse, Error>) => {
      const data = query.state.data as OrderStatusResponse | undefined;

      // Poll every 2 seconds if pending/processing
      if (data?.status === "pending" || data?.status === "processing") {
        return 2000;
      }
      return false;
    },
  });
};
