"use client";

import { PurpleLogo } from "@/src/app/assets";
import { useBalance } from "@/src/features/credits/api/hooks";
import { UserButton, useUser } from "@clerk/nextjs";
import { Coins, Loader2, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const { data: coins, isLoading, isError } = useBalance();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  // Memoized navigation handler with loading state
  const handleNavigation = useCallback(
    (route: string) => {
      if (pendingRoute === route) return; // Prevent double-clicks

      setPendingRoute(route);
      startTransition(() => {
        router.push(route);
        // Reset pending state after navigation attempt
        setTimeout(() => setPendingRoute(null), 1000);
      });
    },
    [router, pendingRoute]
  );

  // Format balance with error handling - use useMemo instead of useCallback
  const formattedBalance = useMemo(() => {
    if (isLoading) return <Loader2 className="w-3 h-3 animate-spin" />;
    if (isError) return "–";
    if (coins?.balance === null || coins?.balance === undefined) return "0";
    return coins.balance.toLocaleString();
  }, [coins, isError, isLoading]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 max-w-7xl"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Reliv Chats AI - Home"
            prefetch={true}
          >
            <div className="relative shrink-0">
              <Image
                src={PurpleLogo}
                alt=""
                className="h-7 sm:h-10 md:h-12 w-auto"
                width={150}
                height={50}
                priority
                loading="eager"
              />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-bold bg-primary bg-clip-text text-transparent whitespace-nowrap">
              Reliv Chats AI
            </span>
          </Link>

          {/* Right side - Auth & Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isSignedIn ? (
              <>
                {/* Credit Balance */}
                <button
                  onClick={() => handleNavigation("/pricing")}
                  disabled={isPending && pendingRoute === "/pricing"}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-primary-light to-accent-pink-light rounded-full border border-primary/20 hover:shadow-lg transition-all group disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={`Credit balance: ${
                    coins?.balance ?? 0
                  }. Click to view pricing`}
                  aria-busy={isPending && pendingRoute === "/pricing"}
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shrink-0">
                    {isPending && pendingRoute === "/pricing" ? (
                      <Loader2 className="w-full h-full text-primary animate-spin" />
                    ) : (
                      <Coins className="w-full h-full text-primary group-hover:rotate-12 transition-transform" />
                    )}
                  </div>
                  <span className="font-semibold text-primary text-sm sm:text-base min-w-[2ch] text-center">
                    {formattedBalance}
                  </span>
                </button>

                {/* Dashboard Button - Desktop only */}
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  disabled={isPending && pendingRoute === "/dashboard"}
                  className="hidden sm:flex items-center justify-center gap-2 px-5 py-2 bg-linear-to-r from-primary to-primary-hover text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-w-[120px]"
                  aria-label="Go to dashboard"
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                  aria-busy={isPending && pendingRoute === "/dashboard"}
                >
                  {isPending && pendingRoute === "/dashboard" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span></span>
                    </>
                  ) : (
                    <span>Dashboard</span>
                  )}
                </button>

                {/* User Profile Button */}
                <div className="flex items-center shrink-0">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-primary/20 hover:ring-primary transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        userButtonPopoverCard: "shadow-xl",
                        userButtonPopoverActions: "py-2",
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      {/* Dashboard link for mobile */}
                      <UserButton.Action
                        label="Dashboard"
                        labelIcon={<Coins className="w-4 h-4" />}
                        onClick={() => handleNavigation("/dashboard")}
                      />
                      <UserButton.Action
                        label="Settings"
                        labelIcon={<Settings className="w-4 h-4" />}
                        onClick={() => handleNavigation("/settings")}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <button
                  onClick={() => handleNavigation("/sign-in")}
                  disabled={isPending && pendingRoute === "/sign-in"}
                  className="flex items-center justify-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 font-medium hover:text-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg min-w-20 sm:min-w-[100px]"
                  aria-label="Sign in to your account"
                  aria-busy={isPending && pendingRoute === "/sign-in"}
                >
                  {isPending && pendingRoute === "/sign-in" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span className="hidden sm:inline"></span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
