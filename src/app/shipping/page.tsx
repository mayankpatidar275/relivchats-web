import { Cloud, Zap, Download, Info } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Policy | Reliv Chats",
  description: "Understand how Reliv Chats delivers digital insights instantly. No physical shipping required.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary via-primary-hover to-primary-deep text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-accent-pink rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6 py-16 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">Service Delivery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Delivery Policy</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              RelivChats is a 100% digital SaaS platform. No physical products are shipped.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Digital Service Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-8">
            <div className="flex items-start gap-4">
              <Info className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">100% Digital Service</h2>
                <p className="text-gray-700 mb-4">
                  RelivChats is a cloud-based software-as-a-service (SaaS) platform. All our products and services are delivered digitally through our web application. We do not manufacture, sell, or ship any physical goods.
                </p>
                <p className="text-sm text-gray-600">
                  This page exists for compliance with payment processor requirements, but a traditional "shipping policy" does not apply to our digital service.
                </p>
              </div>
            </div>
          </div>

          {/* How Our Service is Delivered */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our Service is Delivered</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Digital Access</h3>
                  <p className="text-gray-600 text-sm">
                    When you create an account or purchase credits, you receive immediate access to all features. No waiting, no shipping delays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Cloud-Based Platform</h3>
                  <p className="text-gray-600 text-sm">
                    Access your chats, insights, and dashboard from any device with an internet connection. Nothing to download or install (web version).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Export</h3>
                  <p className="text-gray-600 text-sm">
                    You can export your insights as digital files (PDF, JSON) directly from the platform whenever you need them.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Availability</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <h3 className="font-semibold text-gray-900 mb-2">Platform Access</h3>
                <p className="text-sm text-gray-600">
                  Our platform is available 24 hours a day, 7 days a week, 365 days a year (barring scheduled maintenance).
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="text-3xl font-bold text-primary mb-2">&lt;5 min</div>
                <h3 className="font-semibold text-gray-900 mb-2">Insight Generation</h3>
                <p className="text-sm text-gray-600">
                  AI-powered insights are typically generated within 2-5 minutes after you unlock them with credits.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">Instant</div>
                <h3 className="font-semibold text-gray-900 mb-2">Credit Delivery</h3>
                <p className="text-sm text-gray-600">
                  Purchased credits are added to your account immediately upon successful payment confirmation.
                </p>
              </div>

              <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                <div className="text-3xl font-bold text-accent-pink mb-2">Global</div>
                <h3 className="font-semibold text-gray-900 mb-2">Worldwide Access</h3>
                <p className="text-sm text-gray-600">
                  Access RelivChats from anywhere in the world with an internet connection. No geographic restrictions.
                </p>
              </div>
            </div>
          </div>

          {/* What You Receive */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Receive</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Free Account</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>50 welcome credits upon registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Unlimited chat uploads and free statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Access to dashboard and chat management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Credit Purchase</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Digital credits added to your account balance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Email receipt with transaction details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Credits never expire (as long as account is active)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">AI Insights</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Detailed relationship analysis by category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Shareable insight cards (PNG/PDF export)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Permanent access to generated insights (stored in your account)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Technical Issues */}
          <div className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Service Access Issues?</h2>
            <p className="mb-6 text-white/90">
              If you're experiencing problems accessing our platform or your purchased credits haven't been delivered, please contact our support team:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Email Support</h3>
                <a href="mailto:mayankpatidar275@gmail.com" className="text-white hover:underline">
                  mayankpatidar275@gmail.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <a href="tel:+918959050275" className="text-white hover:underline">
                  +91 8959050275
                </a>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Related Policies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Policies</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/refunds"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Refund Policy</h3>
                <p className="text-sm text-gray-600">Learn about our refund process for digital credits</p>
              </Link>

              <Link
                href="/terms"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600">Read our complete terms and conditions</p>
              </Link>

              <Link
                href="/privacy"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600">How we protect your data and privacy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
