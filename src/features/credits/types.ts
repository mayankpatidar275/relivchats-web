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

export interface CreditPackageResponse {
  id: string;
  name: string;
  coins: number;
  price_usd: string;
  price_inr: string;
  description?: string;
  is_popular: boolean;
  sort_order: number;
}
