"use client";

import { useEffect, useRef } from "react";
import { useStoreUserMutation } from "../features/users/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUserSync } from "@/src/lib/context/UserSyncContext";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";

export default function ClerkSyncData({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: storeUser } = useStoreUserMutation();
  const { markSynced } = useUserSync();

  const syncedUserIds = useRef(new Set<string>());

  useEffect(() => {
    if (user && isSignedIn && !syncedUserIds.current.has(user.id)) {
      syncedUserIds.current.add(user.id);

      const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
      const userData = {
        user_id: user.id,
        email: primaryEmail,
        first_name: user.firstName || undefined,
        last_name: user.lastName || undefined,
      };

      storeUser(userData, {
        onSuccess: (data) => {
          console.log("User stored successfully:", data);

          // Optimistically set balance in cache to avoid loading state
          queryClient.setQueryData(queryKeys.credits.balance(), {
            user_id: data.user_id,
            balance: data.credit_balance ?? 50,
          });

          // Mark user as synced so dependent queries can run
          markSynced();
        },
        onError: (error) => {
          console.error("Error storing user:", error);
          syncedUserIds.current.delete(user.id);
          router.push("/sign-in");
        },
      });
    }
  }, [user, user?.id, isSignedIn, storeUser, router, markSynced, queryClient]);

  return <>{children}</>;
}
