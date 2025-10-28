"use client";

import Link from "next/link";
import {
  Heart,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Categories", href: "/#categories" },
      { name: "Pricing", href: "/pricing" },
      { name: "How It Works", href: "/#how-it-works" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
    ],
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
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-accent-pink rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 bg-linear-to-br from-primary to-accent-pink rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
                Reliv Chats
              </span>
            </Link>

            <p className="text-gray-600 leading-relaxed max-w-sm">
              Unlock the hidden stories in your chats. AI-powered insights for
              deeper connections and meaningful relationships.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-primary hover:to-primary-hover flex items-center justify-center text-gray-600 hover:text-white transition-all group"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-pink-500 hover:to-rose-500 flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-blue-600 hover:to-blue-700 flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@relivchats.com"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-linear-to-br hover:from-primary hover:to-accent-pink flex items-center justify-center text-gray-600 hover:text-white transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

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
