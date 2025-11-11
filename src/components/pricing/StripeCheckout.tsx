// src/components/pricing/StripeCheckout.tsx
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useCreatePaymentOrder } from "@/src/features/payments/api/hooks";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeCheckoutProps {
  packageId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function CheckoutForm({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard?payment=success`,
        },
      });

      if (error) {
        onError(error.message || "Payment failed");
        toast.error(error.message);
      } else {
        onSuccess();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError(error.message || "Payment failed");
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export function useStripeCheckout({
  packageId,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const createOrder = useCreatePaymentOrder();

  const initiatePurchase = async () => {
    try {
      const order = await createOrder.mutateAsync({
        package_id: packageId,
        provider: "stripe",
        idempotency_key: `${packageId}-${Date.now()}`,
      });

      if (order.client_secret) {
        setClientSecret(order.client_secret);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError(error.message || "Failed to initiate payment");
      toast.error("Failed to initiate payment");
    }
  };

  const StripeCheckoutModal = clientSecret ? (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#8b5cf6",
          },
        },
      }}
    >
      <CheckoutForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  ) : null;

  return {
    initiatePurchase,
    StripeCheckoutModal,
    isLoading: createOrder.isPending,
  };
}
