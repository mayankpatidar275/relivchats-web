import { clientApi } from "@/src/lib/api/client-api";
import { CreditBalanceResponse, TransactionHistoryResponse } from "../types";

export const clientCreditMethods = {
  getBalance: async (): Promise<CreditBalanceResponse> => {
    return clientApi.get<CreditBalanceResponse>("credits/balance");
  },
  getTransactions: async (): Promise<TransactionHistoryResponse> => {
    return clientApi.get<TransactionHistoryResponse>("credits/transactions");
  },
};
