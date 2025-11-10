import { queryKeys } from "@/src/lib/query/keys";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { clientCreditMethods } from "./client-queries";

export function useBalance() {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.credits.balance(),
    queryFn: clientCreditMethods.getBalance,
    enabled: isSignedIn === true, // strict true check,
  });
}
export function useTransactions() {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.credits.transactions(),
    queryFn: clientCreditMethods.getTransactions,
    enabled: isSignedIn === true,
  });
}

export function usePackages() {
  return useQuery({
    queryKey: queryKeys.credits.packages(),
    queryFn: clientCreditMethods.getPackages,
  });
}
