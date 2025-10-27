"use client";

import { HeaderLogo, WhiteLogo } from "@/src/app/assets";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header w-full border-b border-primary-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={HeaderLogo}
            alt="Reliv Chats Logo"
            className="h-8 sm:h-12 w-auto"
            width={150}
            height={150}
            priority
          />
          <span className="text-xl sm:text-2xl font-bold text-primary-deep">
            Reliv Chats
          </span>
        </Link>

        {/* Navigation and User Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Categories Link */}
          <Link href="/category/romantic" className="hidden sm:inline-block">
            <button className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300">
              Categories
            </button>
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative px-5 py-2 bg-gradient-to-r-primary-accent text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  Sign In
                  <Sparkles className="w-4 h-4 group-hover:animate-pulse-glow" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r-primary-deep-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Coin Balance */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink-light text-accent-pink font-semibold text-sm">
                <Sparkles className="w-4 h-4 animate-pulse-glow" />
                <span>{/* {balance?.coins ?? "--"} */} 50 ⍟</span>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2">
                <img
                  src={user?.imageUrl ?? "/default-avatar.png"}
                  alt={user?.fullName ?? "User"}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary-20"
                />
                <span className="hidden sm:inline text-sm font-semibold text-gray-900">
                  {user?.firstName ?? "User"}
                </span>
                <SignOutButton>
                  <button className="px-3 py-1 rounded-full bg-white text-gray-900 text-sm font-semibold border border-gray-200 hover:bg-primary hover:text-white transition-all duration-300">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
