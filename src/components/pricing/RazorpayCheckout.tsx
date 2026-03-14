// src/components/pricing/RazorpayCheckout.tsx
"use client";

import { useCreatePaymentOrder, useOrderStatus } from "@/src/features/payments/api/hooks";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";
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
  const queryClient = useQueryClient();
  const [pendingOrderId, setPendingOrderId] = useState("");
  const balanceRefreshed = useRef(false);
  const { data: orderStatus } = useOrderStatus(pendingOrderId);

  // When the order is confirmed server-side (webhook processed), refresh balance.
  // useOrderStatus stops polling automatically once status leaves pending/processing,
  // so we only need a guard ref to prevent firing more than once per order.
  useEffect(() => {
    if (
      pendingOrderId &&
      !balanceRefreshed.current &&
      (orderStatus?.status === "completed" || orderStatus?.status === "paid")
    ) {
      balanceRefreshed.current = true;
      queryClient.invalidateQueries({ queryKey: queryKeys.credits.balance() });
    }
  }, [orderStatus?.status, pendingOrderId, queryClient]);

  const [isScriptLoaded, setIsScriptLoaded] = useState(() => {
    // Initialize with current state
    return typeof window !== "undefined" && !!window.Razorpay;
  });

  // Load Razorpay script with proper loading detection
  useEffect(() => {
    // Check if script is already loaded
    if (window.Razorpay) {
      return;
    }

    // Check if script element exists
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      // Script exists but might not be loaded yet
      const handleLoad = () => {
        setIsScriptLoaded(true);
      };
      existingScript.addEventListener("load", handleLoad);
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    // Create and load new script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      toast.error("Failed to load Razorpay. Please refresh the page.");
      setIsScriptLoaded(false);
    };

    document.body.appendChild(script);
  }, []);

  const initiatePurchase = async () => {
    try {
      // Check if script is loaded
      if (!isScriptLoaded || !window.Razorpay) {
        toast.error(
          "Payment system is loading. Please wait a moment and try again."
        );
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

      // Start polling order status — balance will refresh when webhook completes
      balanceRefreshed.current = false;
      setPendingOrderId(order.order_id);

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
    isScriptLoaded,
  };
}
