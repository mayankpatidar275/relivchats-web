export type PaymentProvider = "razorpay" | "stripe";

export interface CreateOrderRequest {
  package_id: string;
  provider: PaymentProvider;
  idempotency_key?: string;
}

export interface CreateOrderResponse {
  order_id: string;
  provider_order_id: string;
  amount: number;
  currency: string;
  coins: number;
  provider: PaymentProvider;
  client_secret?: string;
  checkout_url?: string;
}

export interface OrderStatusResponse {
  order_id: string;
  status: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  coins: number;
  created_at: string;
  completed_at?: string;
}
