import { clientApi } from "@/src/lib/api";
import { CreateOrderRequest, CreateOrderResponse } from "../types";

export const paymentsMutations = {
  createPaymentOrder: async (
    data: CreateOrderRequest
  ): Promise<CreateOrderResponse> => {
    return clientApi.post<CreateOrderResponse>("api/payments/orders", data);
  },
};
