import { clientApi } from "@/src/lib/api/client-api";
import {
  CreditBalanceResponse,
  CreditPackageResponse,
  TransactionHistoryResponse,
} from "../types";

export const clientCreditMethods = {
  getBalance: async (): Promise<CreditBalanceResponse> => {
    return clientApi.get<CreditBalanceResponse>("credits/balance");
  },
  getTransactions: async (): Promise<TransactionHistoryResponse> => {
    return clientApi.get<TransactionHistoryResponse>("credits/transactions");
  },
  getPackages: async (): Promise<CreditPackageResponse[]> => {
    return clientApi.get<CreditPackageResponse[]>("credits/packages");
  },
};
