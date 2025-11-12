// src/components/pricing/PaymentModal.tsx
"use client";

import { X, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRazorpayCheckout } from "./RazorpayCheckout";
import { useStripeCheckout } from "./StripeCheckout";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: string;
    name: string;
    coins: number;
    price_usd: string;
    price_inr: string;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  packageData,
  onSuccess,
  onError,
}: PaymentModalProps) {
  //   const [selectedProvider, setSelectedProvider] = useState<
  //     "razorpay" | "stripe" | null
  //   >(null);
  //   const [userLocation, setUserLocation] = useState<"IN" | "OTHER">("OTHER");

  // Detect user location (you might want to use a proper geolocation service)
  // detect once synchronously
  const detectProvider = () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("Asia/Kolkata") || tz.includes("Asia/Calcutta")) {
      return {
        userLocation: "IN" as const,
        selectedProvider: "razorpay" as const,
      };
    }
    return {
      userLocation: "OTHER" as const,
      selectedProvider: "stripe" as const,
    };
  };

  const initial = detectProvider();

  const [selectedProvider, setSelectedProvider] = useState<
    "razorpay" | "stripe" | null
  >(initial.selectedProvider);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocation, setUserLocation] = useState<"IN" | "OTHER">(
    initial.userLocation
  );

  //   useEffect(() => {
  //     // Simple timezone-based detection (not 100% accurate but works for demo)
  //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //     if (
  //       timezone.includes("Asia/Kolkata") ||
  //       timezone.includes("Asia/Calcutta")
  //     ) {
  //       setUserLocation("IN");
  //       setSelectedProvider("razorpay");
  //     } else {
  //       setUserLocation("OTHER");
  //       setSelectedProvider("stripe");
  //     }
  //   }, []);

  const razorpay = useRazorpayCheckout({
    packageId: packageData.id,
    onSuccess,
    onError,
  });

  const stripe = useStripeCheckout({
    packageId: packageData.id,
    onSuccess,
    onError,
  });

  const handlePaymentInitiation = async () => {
    if (selectedProvider === "razorpay") {
      await razorpay.initiatePurchase();
    } else if (selectedProvider === "stripe") {
      await stripe.initiatePurchase();
    }
  };

  if (!isOpen) return null;

  const isLoading = razorpay.isLoading || stripe.isLoading;
  const showStripeForm =
    selectedProvider === "stripe" && stripe.StripeCheckoutModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-primary to-accent-pink rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Complete Purchase
              </h3>
              <p className="text-sm text-gray-600">{packageData.name}</p>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="p-6 bg-linear-to-br from-primary-light to-accent-pink-light border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">Coins</span>
            <span className="text-2xl font-bold text-gray-900">
              {packageData.coins.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Total Amount</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {userLocation === "IN" ? (
                  <>₹{packageData.price_inr}</>
                ) : (
                  <>${packageData.price_usd}</>
                )}
              </div>
              <div className="text-xs text-gray-600">
                {userLocation === "IN" ? "Indian Rupees" : "US Dollars"}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        {!showStripeForm && (
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Payment Method
            </label>
            <div className="space-y-3">
              {/* Razorpay Option */}
              <button
                onClick={() => setSelectedProvider("razorpay")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedProvider === "razorpay"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                disabled={isLoading}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">RP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Razorpay
                      </div>
                      <div className="text-xs text-gray-600">
                        Credit/Debit Card, UPI, Wallets
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedProvider === "razorpay"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedProvider === "razorpay" && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                {userLocation === "IN" && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Recommended for India
                  </div>
                )}
              </button>

              {/* Stripe Option */}
              <button
                onClick={() => setSelectedProvider("stripe")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedProvider === "stripe"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                disabled={isLoading}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ST</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Stripe</div>
                      <div className="text-xs text-gray-600">
                        Credit/Debit Cards, Apple Pay
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedProvider === "stripe"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedProvider === "stripe" && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                {userLocation !== "IN" && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Recommended for International
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stripe Payment Form */}
        {showStripeForm && (
          <div className="p-6">
            <button
              onClick={() => setSelectedProvider(null)}
              className="text-sm text-primary hover:underline mb-4"
            >
              ← Change payment method
            </button>
            {stripe.StripeCheckoutModal}
          </div>
        )}

        {/* Action Buttons */}
        {!showStripeForm && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handlePaymentInitiation}
              disabled={!selectedProvider || isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                !selectedProvider || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-linear-to-r from-primary to-accent-pink text-white hover:shadow-xl hover:scale-105"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Proceed to Pay
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 Secure payment • Your data is encrypted and protected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
