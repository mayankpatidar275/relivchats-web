import { clientApi } from "@/src/lib/api/client-api";
import { OrderStatusResponse } from "../types";

export const paymentsApi = {
  getOrderStatus: async (orderId: string): Promise<OrderStatusResponse> => {
    return clientApi.get<OrderStatusResponse>(`api/payments/orders/${orderId}`);
  },
};
