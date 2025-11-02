"use client";

import { useEffect, useRef } from "react";
import { useStoreUserMutation } from "../features/users/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ClerkSyncData({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { mutate: storeUser } = useStoreUserMutation();

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
        },
        onError: (error) => {
          console.error("Error storing user:", error);
          syncedUserIds.current.delete(user.id);
          router.push("/sign-in");
        },
      });
    }
  }, [user?.id, isSignedIn, storeUser, router]);

  return <>{children}</>;
}
