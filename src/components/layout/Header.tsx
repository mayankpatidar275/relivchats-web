"use client";

import { PurpleLogo } from "@/src/app/assets";
import { UserButton, useUser } from "@clerk/nextjs";
import { Coins, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navLinks: any[] = [
    // { name: "Home", href: "/" },
    // { name: "Categories", href: "/#categories" },
    // { name: "How It Works", href: "/#how-it-works" },
    // { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src={PurpleLogo}
                alt="Logo"
                className="h-8 sm:h-12 w-auto"
                width={150}
                height={50}
                priority
              />
            </div>
            <span className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
              Reliv Chats AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-accent-pink rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Auth & Actions */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                {/* Credit Balance */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-light to-accent-pink-light rounded-full border border-primary/20 hover:shadow-lg transition-all group"
                >
                  <Coins className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-primary">
                    50 {/* Replace with actual balance */}
                  </span>
                </button>

                {/* Dashboard button */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="hidden sm:block px-5 py-2 bg-linear-to-r from-primary to-primary-hover text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  Dashboard
                </button>

                {/* User button */}
                <div className="flex items-center gap-2">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-10 h-10 ring-2 ring-primary/20 hover:ring-primary transition-all",
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Sign In */}
                <button
                  onClick={() => router.push("/sign-in")}
                  className="hidden sm:block px-5 py-2 text-gray-700 font-medium hover:text-primary transition-colors"
                >
                  Sign In
                </button>

                {/* Get Started */}
                {/* <button
                  onClick={() => router.push("/signup")}
                  className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-hover text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </button> */}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
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
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-semibold"
                  >
                    <Coins className="w-5 h-5" />
                    Dashboard (50 coins)
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

                  {/* <button
                    onClick={() => {
                      router.push("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-semibold"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started Free
                  </button> */}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
