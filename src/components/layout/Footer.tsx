"use client";

import Link from "next/link";
import { Heart, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { PurpleLogo } from "@/src/app/assets";

export default function Footer() {
  const footerLinks = {
    // product: [
    //   { name: "Features", href: "/#features" },
    //   { name: "Categories", href: "/#categories" },
    //   { name: "Pricing", href: "/pricing" },
    //   { name: "How It Works", href: "/#how-it-works" },
    // ],
    // company: [
    //   { name: "About Us", href: "/about" },
    //   { name: "Blog", href: "/blog" },
    //   { name: "Careers", href: "/careers" },
    //   { name: "Contact", href: "/contact" },
    // ],
    legal: [
      {
        name: "Privacy Policy",
        href: "https://merchant.razorpay.com/policy/OMyE4JSPYTCzjp/privacy",
      },
      {
        name: "Terms and Conditions",
        href: "https://merchant.razorpay.com/policy/OMyE4JSPYTCzjp/terms",
      },
      {
        name: "Shipping Policy",
        href: "https://merchant.razorpay.com/policy/OMyE4JSPYTCzjp/shipping",
      },
      {
        name: "Cancellations and Refunds",
        href: "https://merchant.razorpay.com/policy/OMyE4JSPYTCzjp/refund",
      },
      {
        name: "Contact Us",
        href: "https://merchant.razorpay.com/policy/OMyE4JSPYTCzjp/contact_us",
      },
    ],
    // support: [
    //   { name: "Help Center", href: "/help" },
    //   { name: "FAQ", href: "/faq" },
    //   { name: "Community", href: "/community" },
    //   { name: "Status", href: "/status" },
    // ],
  };

  return (
    <footer className="relative bg-linear-to-br from-gray-50 to-white border-t border-gray-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-20" />
        <div className="absolute top-0 right-20 w-64 h-64 bg-accent-pink-light rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative mx-auto px-6 py-16 max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
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
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Unlock the hidden stories in your chats. AI-powered insights for
              deeper connections and meaningful relationships.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/mkpatidarr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-primary hover:to-primary-hover flex items-center justify-center text-gray-600 hover:text-white transition-all group"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mkpatidarr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-pink-500 hover:to-rose-500 flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mkpatidarr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-blue-600 hover:to-blue-700 flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:mayankpatidar275@gmail.com"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-primary hover:to-accent-pink flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          {/* <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Reliv Chats. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
              for better connections
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
