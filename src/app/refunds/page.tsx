import { RefreshCw, Clock, CreditCard, AlertCircle, CheckCircle, XCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Reliv Chats",
  description: "Learn about our refund policy for credit purchases and when refunds are available.",
};

export default function RefundPolicyPage() {
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
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">Legal Documents</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund & Cancellation Policy</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              We strive for complete customer satisfaction. This policy outlines our refund process for digital credits and AI-powered insights.
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
          {/* Policy Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Overview</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-primary-light rounded-xl p-5 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">3-5 Days</div>
                <div className="text-sm text-gray-600">Refund Processing Time</div>
              </div>

              <div className="bg-green-50 rounded-xl p-5 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">Fair Policy</div>
                <div className="text-sm text-gray-600">Customer-First Approach</div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">Full Refund</div>
                <div className="text-sm text-gray-600">For Service Failures</div>
              </div>
            </div>
          </div>

          {/* Digital Credits Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              Digital Credits Refund Policy
            </h2>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Important Notice</p>
                    <p className="text-sm text-gray-700">
                      Digital credits are generally <strong>non-refundable</strong> once purchased, as they are immediately available for use. However, we offer refunds in specific circumstances outlined below.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">When You CAN Get a Refund:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 bg-green-50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Payment Processing Errors</h4>
                      <p className="text-sm text-gray-600">
                        You were charged multiple times for a single purchase, or credits were not added to your account after successful payment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-green-50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Service Failures</h4>
                      <p className="text-sm text-gray-600">
                        AI insight generation failed due to technical issues on our end, and credits were deducted without providing the insights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-green-50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Accidental Purchase (Within 24 Hours)</h4>
                      <p className="text-sm text-gray-600">
                        You purchased credits by mistake and haven't used any of them. Request must be made within 24 hours of purchase.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-green-50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Platform Malfunction</h4>
                      <p className="text-sm text-gray-600">
                        Extended service downtime (more than 48 hours) prevented you from using purchased credits
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">When You CANNOT Get a Refund:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 bg-red-50 rounded-xl p-4">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Credits Already Used</h4>
                      <p className="text-sm text-gray-600">
                        You've already spent the credits to generate insights (even partially)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-red-50 rounded-xl p-4">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Dissatisfaction with AI Insights</h4>
                      <p className="text-sm text-gray-600">
                        You're unhappy with the quality or accuracy of AI-generated insights. (See our <Link href="/terms#ai-disclaimer" className="text-primary hover:underline">AI Disclaimer</Link>)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-red-50 rounded-xl p-4">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Change of Mind (After 24 Hours)</h4>
                      <p className="text-sm text-gray-600">
                        You no longer want the credits after the 24-hour accidental purchase window
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-red-50 rounded-xl p-4">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Account Termination (Your Violation)</h4>
                      <p className="text-sm text-gray-600">
                        Your account was suspended or terminated for violating our Terms of Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Generation Failures */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Insight Generation Failures</h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                If you encounter an error while generating insights and your credits were deducted:
              </p>

              <div className="bg-primary-light rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Automatic Credit Restoration</h3>
                <p className="text-sm text-gray-600 mb-3">
                  In most cases, credits are automatically restored to your account within 10 minutes if the AI processing fails.
                </p>
                <p className="text-sm text-gray-600">
                  If this doesn't happen, please contact support with your chat ID and we'll investigate immediately.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Technical Failures (Our Fault)</h4>
                  <p className="text-sm text-gray-600 mb-2">Full credit refund or restoration</p>
                  <ul className="space-y-1 text-xs text-gray-500">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>Server errors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>AI model unavailability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>Database connection issues</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">User-Side Issues (Not Our Fault)</h4>
                  <p className="text-sm text-gray-600 mb-2">Credit restoration on case-by-case basis</p>
                  <ul className="space-y-1 text-xs text-gray-500">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>Invalid chat file format</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>Corrupted chat data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                      <span>Network disconnection during upload</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Partial Refunds */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Partial Refunds</h2>

            <div className="space-y-4 text-gray-600">
              <p>
                In exceptional circumstances, we may offer partial refunds for credit packages:
              </p>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Eligibility for Partial Refunds</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">1</span>
                    </span>
                    <span>You purchased a large credit package (250+ credits)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">2</span>
                    </span>
                    <span>You've used less than 20% of the credits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">3</span>
                    </span>
                    <span>You have a legitimate reason (e.g., platform doesn't support your chat format, medical emergency)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">4</span>
                    </span>
                    <span>Request made within 14 days of purchase</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm">
                Partial refunds are calculated based on unused credits minus a processing fee. Each case is reviewed individually.
              </p>
            </div>
          </div>

          {/* Refund Processing */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              Refund Processing Timeline
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="text-2xl font-bold text-primary mb-1">1-2 Days</div>
                  <p className="text-sm text-gray-600 mb-2">Request Review</p>
                  <p className="text-xs text-gray-500">We review your refund request and verify eligibility</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="text-2xl font-bold text-primary mb-1">3-5 Days</div>
                  <p className="text-sm text-gray-600 mb-2">Refund Processing</p>
                  <p className="text-xs text-gray-500">Funds are returned to your original payment method</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="text-2xl font-bold text-primary mb-1">5-10 Days</div>
                  <p className="text-sm text-gray-600 mb-2">Bank Processing</p>
                  <p className="text-xs text-gray-500">Your bank or card issuer reflects the refund (varies by institution)</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-700">Note:</strong> Total time from refund approval to money in your account is typically 3-15 business days, depending on your payment method and financial institution.
                </p>
              </div>
            </div>
          </div>

          {/* Chargeback Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chargeback Policy</h2>

            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Please Don't File Chargebacks Without Contacting Us First</p>
                    <p className="text-sm text-gray-700">
                      Chargebacks hurt small businesses and often result in additional fees. We're committed to resolving issues fairly and quickly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-gray-600">
                <h3 className="font-semibold text-gray-900">Our Chargeback Process:</h3>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">1. Contact Us First</h4>
                  <p className="text-sm">
                    Email us at <a href="mailto:mayankpatidar275@gmail.com" className="text-primary hover:underline font-semibold">mayankpatidar275@gmail.com</a> with your issue. Most disputes can be resolved within 24-48 hours.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">2. Investigation</h4>
                  <p className="text-sm">
                    If a chargeback is filed, we'll provide evidence to your bank showing proof of service delivery (transaction records, account activity logs, insights generated).
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">3. Consequences of Fraudulent Chargebacks</h4>
                  <p className="text-sm">
                    Chargebacks filed for services that were properly delivered may result in permanent account suspension and potential legal action to recover costs.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-700">Legitimate Chargebacks:</strong> We understand chargebacks may be necessary for unauthorized transactions or fraud. In such cases, please still notify us so we can investigate and improve security.
                </p>
              </div>
            </div>
          </div>

          {/* How to Request a Refund */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Request a Refund</h2>

            <div className="space-y-6">
              <div className="bg-primary-light rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Submit a Refund Request</h3>
                <p className="text-sm text-gray-600 mb-4">
                  To request a refund, contact us with the following information:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Your registered email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Transaction ID or receipt (if available)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Date of purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Reason for refund request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Any relevant screenshots or error messages</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <Mail className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <a href="mailto:mayankpatidar275@gmail.com" className="text-primary hover:underline font-semibold">
                    mayankpatidar275@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 mt-2">Response time: 24-48 hours</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <Phone className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <a href="tel:+918959050275" className="text-primary hover:underline font-semibold">
                    +91 8959050275
                  </a>
                  <p className="text-xs text-gray-500 mt-2">Available: Mon-Sat, 10 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover hover:shadow-lg transition-all"
                >
                  Contact Support for Refund
                </Link>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>

            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">No Subscriptions:</strong> RelivChats operates on a pay-as-you-go credit system. There are no recurring subscriptions or memberships to cancel.
              </p>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Account Deletion</h3>
                <p className="text-sm mb-2">
                  You may delete your account at any time from your account settings. Upon deletion:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>All your chat data and insights will be permanently deleted within 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Unused credits will be forfeited (no refund)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Transaction history retained for legal/tax purposes (7 years)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Questions About Refunds?</h2>
            <p className="mb-6 text-white/90">
              We're here to help. Contact us with any questions or concerns about our refund policy:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:mayankpatidar275@gmail.com" className="text-white hover:underline">
                  mayankpatidar275@gmail.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Phone</h3>
                <a href="tel:+918959050275" className="text-white hover:underline">
                  +91 8959050275
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Mailing Address</h3>
                <p className="text-sm text-white/90">
                  Mayank Patidar<br />
                  Dantodiya Village<br />
                  Ratlam, MP 457441, India
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="font-semibold mb-2">Support Hours</h3>
                <p className="text-sm text-white/90">
                  Monday - Saturday<br />
                  10:00 AM - 6:00 PM IST
                </p>
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
        </div>
      </div>
    </div>
  );
}
