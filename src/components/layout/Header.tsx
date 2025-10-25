// src/components/layout/Header.tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="w-full border-b bg-white/50 dark:bg-black/40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Reliv Chats
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/category/romantic" className="hidden md:inline-block">
            <button className="px-3 py-1 rounded-md bg-slate-50">
              Categories
            </button>
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded bg-yellow-100 text-yellow-900">
                {/* {balance?.coins ?? "--"} ⍟ */}
              </div>
              <div className="flex items-center gap-2">
                <img
                  // src={user?.profileImageUrl}
                  alt={user?.fullName ?? "avatar"}
                  className="w-8 h-8 rounded-full"
                />
                <SignOutButton>
                  <button className="px-2 py-1 text-sm">Sign out</button>
                </SignOutButton>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
