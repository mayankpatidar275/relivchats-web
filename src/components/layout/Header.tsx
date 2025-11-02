"use client";

import { PurpleLogo } from "@/src/app/assets";
import { UserButton, useUser } from "@clerk/nextjs";
import { Coins, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links - currently commented out but kept for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navLinks = [
    // { name: "Home", href: "/" },
    // { name: "Categories", href: "/#categories" },
    // { name: "How It Works", href: "/#how-it-works" },
    // { name: "Pricing", href: "/pricing" },
  ];

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
            className="flex items-center gap-2 group shrink-0"
            aria-label="Reliv Chats AI - Home"
          >
            <div className="relative shrink-0">
              <Image
                src={PurpleLogo}
                alt="Reliv Chats AI Logo"
                className="h-7 sm:h-10 md:h-12 w-auto"
                width={150}
                height={50}
                priority
              />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-bold bg-primary bg-clip-text text-transparent whitespace-nowrap">
              Reliv Chats AI
            </span>
          </Link>

          {/* Desktop Navigation - Hidden for now but structure kept */}
          {/* <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent-pink rounded-full" />
                )}
              </Link>
            ))}
          </div> */}

          {/* Right side - Auth & Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isSignedIn ? (
              <>
                {/* Credit Balance - Visible on all screen sizes */}
                <button
                  onClick={() => router.push("/pricing")}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-primary-light to-accent-pink-light rounded-full border border-primary/20 hover:shadow-lg transition-all group"
                  aria-label="View credit balance and pricing"
                >
                  <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-primary text-sm sm:text-base">
                    50
                  </span>
                </button>

                {/* Dashboard Button - Desktop only */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="hidden sm:block px-5 py-2 bg-linear-to-r from-primary to-primary-hover text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
                  // className={`hidden sm:flex items-center px-4 md:px-5 py-2 rounded-full font-medium transition-all ${
                  //   pathname === "/dashboard"
                  //     ? "bg-linear-to-r from-primary to-primary-hover text-white shadow-lg"
                  //     : "text-gray-700 hover:bg-gray-100"
                  // }`}
                  aria-label="Go to dashboard"
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                >
                  Dashboard
                </button>

                {/* User Profile Button */}
                <div className="flex items-center">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-primary/20 hover:ring-primary transition-all cursor-pointer",
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
                        onClick={() => router.push("/dashboard")}
                      />
                      <UserButton.Action
                        label="Settings"
                        labelIcon={<Settings className="w-4 h-4" />}
                        onClick={() => router.push("/settings")}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <button
                  onClick={() => router.push("/sign-in")}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 font-medium hover:text-primary transition-colors"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </button>

                {/* Get Started Button - Uncomment when needed */}
                {/* <button
                  onClick={() => router.push("/signup")}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-primary-hover text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm sm:text-base"
                  aria-label="Get started for free"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </button> */}
              </>
            )}

            {/* Mobile Menu Button - Commented out since no nav items currently */}
            {/* {navLinks.length > 0 && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )} */}
          </div>
        </div>

        {/* Mobile Menu - Commented out but kept for future use */}
        {/* {isMobileMenuOpen && navLinks.length > 0 && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isSignedIn ? (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => {
                      router.push("/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl font-semibold"
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => {
                      router.push("/sign-in");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 text-gray-700 font-medium border-2 border-gray-200 rounded-xl hover:border-primary transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )} */}
      </nav>
    </header>
  );
}
