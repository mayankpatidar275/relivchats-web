export interface CreditBalanceResponse {
  user_id: string;
  balance: number;
}
export interface CreditTransactionResponse {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
  description?: string;
  status: string;
  created_at: string;
}

export interface TransactionHistoryResponse {
  transactions: CreditTransactionResponse[];
  total_count: number;
  current_balance: number;
}
