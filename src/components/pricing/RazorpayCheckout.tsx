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
    // Check if script is already loaded
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      toast.error("Failed to load Razorpay. Please try again.");
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be needed by other components
    };
  }, []);

  const initiatePurchase = async () => {
    try {
      // Validate Razorpay script is loaded
      if (!window.Razorpay) {
        toast.error("Razorpay is not loaded. Please refresh and try again.");
        onError("Razorpay script not loaded");
        return;
      }

      // Validate environment variable
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        console.error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set");
        toast.error("Payment configuration error. Please contact support.");
        onError("Razorpay key not configured");
        return;
      }

      // Create order
      const order = await createOrder.mutateAsync({
        package_id: packageId,
        provider: "razorpay",
        idempotency_key: `${packageId}-${Date.now()}`,
      });

      // Initialize Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "RelivChats",
        description: `Purchase ${order.coins} Coins`,
        order_id: order.provider_order_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: function (response: any) {
          console.log("Razorpay payment response:", response);
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
          color: "#8b5cf6", // Primary purple color
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            onError("Payment cancelled by user");
          },

          escape: true,
          backdropclose: false,
        },
      };

      const razorpay = new window.Razorpay(options);

      // Handle payment failures
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      razorpay.on("payment.failed", function (response: any) {
        console.error("Razorpay payment failed:", response.error);
        toast.error(
          `Payment failed: ${response.error.description || "Unknown error"}`
        );
        onError(response.error.description || "Payment failed");
      });

      razorpay.open();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Razorpay initiation error:", error);
      const errorMessage = error.message || "Failed to initiate payment";
      onError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return {
    initiatePurchase,
    isLoading: createOrder.isPending,
  };
}
