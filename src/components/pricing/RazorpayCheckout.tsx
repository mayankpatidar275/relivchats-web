// src/components/pricing/RazorpayCheckout.tsx
"use client";

import { useCreatePaymentOrder } from "@/src/features/payments/api/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  packageId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function useRazorpayCheckout({
  packageId,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const createOrder = useCreatePaymentOrder();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePurchase = async () => {
    try {
      // Create order
      const order = await createOrder.mutateAsync({
        package_id: packageId,
        provider: "razorpay",
        idempotency_key: `${packageId}-${Date.now()}`,
      });

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "RelivChats",
        description: `${order.coins} Coins`,
        order_id: order.provider_order_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: function (response: any) {
          console.log("response", response);
          // Payment successful - webhook will credit coins
          toast.success("Payment successful! Crediting coins...");
          onSuccess();
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError(error.message || "Failed to initiate payment");
      toast.error("Failed to initiate payment");
    }
  };

  return {
    initiatePurchase,
    isLoading: createOrder.isPending,
  };
}
