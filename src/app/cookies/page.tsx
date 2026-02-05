import { Cookie, CheckCircle, XCircle, Settings, Shield, BarChart, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Reliv Chats",
  description: "Learn how Reliv Chats uses cookies and how you can manage your cookie preferences.",
};

export default function CookiePolicyPage() {
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
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">Legal Documents</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Learn how RelivChats uses cookies and similar technologies to provide, protect, and improve our service.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <Clock className="w-4 h-4" />
              <span>Last Updated: February 5, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-8">
          {/* What Are Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              What Are Cookies?
            </h2>

            <div className="space-y-4 text-gray-600">
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences, improve your experience, and provide analytics to website owners.
              </p>

              <div className="bg-primary-light rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How We Use Cookies</h3>
                <p className="text-sm">
                  RelivChats uses cookies to authenticate users, maintain secure sessions, remember your preferences, and understand how you use our platform. We use both first-party cookies (set by us) and third-party cookies (set by our service providers).
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-green-500 bg-green-50 rounded-r-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Essential Cookies (Required)</h3>
                    <p className="text-sm text-gray-600">
                      These cookies are necessary for the platform to function and cannot be disabled.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-9">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Authentication & Session Management</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span><strong>Clerk Auth Cookies:</strong> Secure user authentication and login sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span><strong>Session Tokens:</strong> Maintain your logged-in state across pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span><strong>CSRF Protection:</strong> Prevent cross-site request forgery attacks</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Duration:</strong> Session (deleted when you close browser) or up to 7 days for "Remember Me"
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Security & Fraud Prevention</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Detect and prevent fraudulent activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Protect against automated attacks and bots</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Duration:</strong> Session or up to 90 days
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Load Balancing</h4>
                    <p className="text-sm text-gray-600">
                      Route your requests to the correct server for optimal performance
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Duration:</strong> Session
                    </p>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Functional Cookies (Optional)</h3>
                    <p className="text-sm text-gray-600">
                      These cookies enhance your experience by remembering your preferences.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-9">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Preferences & Settings</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Remember your language preference</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Save your dashboard layout preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Store your cookie consent choices</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Duration:</strong> Up to 1 year
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <BarChart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Analytics Cookies (Optional)</h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors use our platform so we can improve it.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-9">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Usage Analytics</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Pages visited and features used</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Time spent on different sections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Navigation paths and user flows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Device type, browser, and screen resolution</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Provider:</strong> Google Analytics or similar (anonymized IP addresses)
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Duration:</strong> Up to 2 years
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Performance Monitoring</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>Page load times and errors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>API response times</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Duration:</strong> Up to 90 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-gray-400 bg-gray-50 rounded-r-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Marketing/Advertising Cookies</h3>
                    <p className="text-sm text-gray-600">
                      <strong>We currently DO NOT use marketing or advertising cookies.</strong>
                    </p>
                  </div>
                </div>

                <div className="ml-9">
                  <p className="text-sm text-gray-600">
                    RelivChats does not currently use third-party advertising networks or retargeting cookies. If this changes in the future, we will update this policy and request your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                Some cookies are set by third-party services we use to provide functionality:
              </p>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Clerk (Authentication)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Sets cookies for secure authentication and user management.
                  </p>
                  <a
                    href="https://clerk.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Clerk Privacy Policy →
                  </a>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Razorpay / Stripe (Payments)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    May set cookies during the payment process for fraud detection and security.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://razorpay.com/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Razorpay Privacy →
                    </a>
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Stripe Privacy →
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics Providers</h3>
                  <p className="text-sm text-gray-600">
                    If we use Google Analytics or similar tools, they may set cookies to track usage patterns (anonymized).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              How to Manage Cookies
            </h2>

            <div className="space-y-6">
              <div className="bg-primary-light rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Cookie Consent Banner</h3>
                <p className="text-sm text-gray-600 mb-3">
                  When you first visit RelivChats, you'll see a cookie consent banner. You can choose to:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Accept all cookies (recommended for best experience)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Accept only essential cookies (functionality may be limited)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Customize your cookie preferences by category</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You can also control cookies through your browser settings:
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Google Chrome</h4>
                    <p className="text-xs text-gray-600">
                      Settings → Privacy and Security → Cookies and other site data
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Firefox</h4>
                    <p className="text-xs text-gray-600">
                      Options → Privacy & Security → Cookies and Site Data
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Safari</h4>
                    <p className="text-xs text-gray-600">
                      Preferences → Privacy → Manage Website Data
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Microsoft Edge</h4>
                    <p className="text-xs text-gray-600">
                      Settings → Privacy, search, and services → Cookies
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-yellow-700">Important:</strong> Blocking or deleting essential cookies may prevent you from logging in or using core features of RelivChats.
                </p>
              </div>
            </div>
          </div>

          {/* GDPR Compliance */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              GDPR Compliance
            </h2>

            <div className="space-y-4 text-gray-600">
              <p>
                In accordance with the General Data Protection Regulation (GDPR), we:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Obtain Consent</h4>
                  <p className="text-sm">Request explicit consent before setting non-essential cookies</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Provide Control</h4>
                  <p className="text-sm">Allow you to withdraw consent and manage preferences anytime</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Transparency</h4>
                  <p className="text-sm">Clearly explain what each cookie does and why we use it</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Data Minimization</h4>
                  <p className="text-sm">Only collect data necessary for legitimate purposes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Changes to This Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Cookie Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. The "Last Updated" date at the top of this page indicates when the policy was last revised.
            </p>
            <p className="text-gray-600">
              Significant changes will be communicated via email or a prominent notice on the platform.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="mb-6 text-white/90">
              If you have questions or concerns about our use of cookies, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:privacy@relivchats.com" className="text-white hover:underline">
                  privacy@relivchats.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <a href="mailto:mayankpatidar275@gmail.com" className="text-white hover:underline">
                  mayankpatidar275@gmail.com
                </a>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Related Policies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Policies</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/privacy"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600">
                  Learn how we collect, use, and protect your personal data
                </p>
              </Link>

              <Link
                href="/terms"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600">
                  Read our complete terms and conditions
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
