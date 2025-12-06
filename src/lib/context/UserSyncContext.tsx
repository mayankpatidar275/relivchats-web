"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useMemo, useState } from "react";

interface UserSyncContextType {
  isUserSynced: boolean;
  markSynced: () => void;
}

const UserSyncContext = createContext<UserSyncContextType | null>(null);

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, userId } = useAuth();
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  // User is synced if:
  // 1. They are signed in
  // 2. The current userId matches the userId that has been marked as synced
  const isUserSynced =
    isSignedIn === true && userId === syncedUserId && !!userId;

  const value = useMemo<UserSyncContextType>(
    () => ({
      isUserSynced,
      markSynced: () => setSyncedUserId(userId || null),
    }),
    [isUserSynced, userId]
  );

  return (
    <UserSyncContext.Provider value={value}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  const context = useContext(UserSyncContext);
  if (!context) {
    throw new Error("useUserSync must be used within UserSyncProvider");
  }
  return context;
}
