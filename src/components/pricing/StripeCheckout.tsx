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
import { Loader2 } from "lucide-react";

// Initialize Stripe outside component to avoid recreating on each render
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}

const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

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

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet. Please wait and try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard?payment=success`,
        },
      });

      if (error) {
        const errorMessage = error.message || "Payment failed";
        onError(errorMessage);
        toast.error(errorMessage);
      } else {
        // Payment succeeded
        onSuccess();
        toast.success("Payment successful! Crediting coins...");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Stripe payment error:", error);
      const errorMessage = error.message || "Payment failed";
      onError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
          !stripe || isProcessing
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105"
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          "Complete Payment"
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        🔒 Your payment information is secure and encrypted
      </p>
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
      // Validate Stripe configuration
      if (!stripePromise) {
        toast.error("Stripe is not configured. Please contact support.");
        onError("Stripe not configured");
        return;
      }

      const order = await createOrder.mutateAsync({
        package_id: packageId,
        provider: "stripe",
        idempotency_key: `${packageId}-${Date.now()}`,
      });

      if (order.client_secret) {
        setClientSecret(order.client_secret);
      } else {
        throw new Error("No client secret received from server");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Stripe initiation error:", error);
      const errorMessage = error.message || "Failed to initiate payment";
      onError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const StripeCheckoutModal =
    clientSecret && stripePromise ? (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#8b5cf6",
              colorBackground: "#ffffff",
              colorText: "#1f2937",
              colorDanger: "#ef4444",
              fontFamily: "system-ui, -apple-system, sans-serif",
              spacingUnit: "4px",
              borderRadius: "12px",
            },
            rules: {
              ".Label": {
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
              },
              ".Input": {
                padding: "12px",
                fontSize: "14px",
              },
              ".Input:focus": {
                boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.2)",
              },
            },
          },
          loader: "auto",
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
