import { FileText, Scale, CreditCard, AlertTriangle, Shield, Ban, Sparkles, Clock, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Reliv Chats",
  description: "Read the terms and conditions for using Reliv Chats AI-powered chat analysis service.",
};

export default function TermsOfServicePage() {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "service-description", title: "Service Description" },
    { id: "account", title: "Account Registration" },
    { id: "credits", title: "Credit System & Pricing" },
    { id: "acceptable-use", title: "Acceptable Use Policy" },
    { id: "ai-disclaimer", title: "AI-Generated Insights Disclaimer" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "payment-terms", title: "Payment Terms" },
    { id: "termination", title: "Termination" },
    { id: "warranty", title: "Warranty Disclaimer" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "jurisdiction", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
  ];

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
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">Legal Documents</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Please read these terms carefully before using RelivChats. By accessing or using our service, you agree to be bound by these terms.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <Clock className="w-4 h-4" />
              <span>Last Updated: February 5, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-gray-600 hover:text-primary hover:translate-x-1 transition-all"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Section 1: Acceptance */}
            <section id="acceptance" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                Acceptance of Terms
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  By creating an account, accessing, or using RelivChats ("Service", "Platform", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you ("User", "you", or "your") and RelivChats, operated by Mayank Patidar.
                </p>
              </div>
            </section>

            {/* Section 2: Service Description */}
            <section id="service-description" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                Service Description
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  RelivChats is an AI-powered chat analysis platform that provides:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-primary-light rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Free Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>Chat upload and storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>Basic statistics (message count, word count, emoji usage, activity patterns)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>50 free credits upon registration</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-accent-pink-light rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Paid Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                        <span>AI-powered relationship insights by category</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                        <span>Deep analysis (emotional intimacy, communication patterns, conflict resolution, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                        <span>Shareable insight cards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Account Registration */}
            <section id="account" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Registration</h2>

              <div className="space-y-4 text-gray-600">
                <p>To use paid features, you must:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">1</span>
                    </span>
                    <span>Be at least 18 years of age</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">2</span>
                    </span>
                    <span>Provide accurate, current, and complete information during registration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">3</span>
                    </span>
                    <span>Maintain the security of your password and accept all responsibility for activities under your account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-xs">4</span>
                    </span>
                    <span>Notify us immediately of any unauthorized use of your account</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Credit System & Pricing */}
            <section id="credits" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                Credit System & Pricing
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">How Credits Work</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Credits (also called "coins") are digital currency used to unlock AI insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Each category insight costs 50-100 credits depending on complexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Credits are non-transferable and non-refundable (see <Link href="/refunds" className="text-primary hover:underline">Refund Policy</Link>)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Credits do not expire as long as your account is active</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Current Pricing</h3>
                  <p className="text-sm text-gray-600 mb-3">All prices are in USD and exclude applicable taxes:</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-primary">$2.99</div>
                      <div className="text-sm text-gray-600">Starter Pack</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-primary">$4.99</div>
                      <div className="text-sm text-gray-600">Basic Pack</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-primary">$9.99</div>
                      <div className="text-sm text-gray-600">Popular Pack</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-primary">$14.99</div>
                      <div className="text-sm text-gray-600">Pro Pack</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Prices may vary by region and are subject to change. Current pricing is always displayed on the{" "}
                    <Link href="/pricing" className="text-primary hover:underline">Pricing page</Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Acceptable Use Policy */}
            <section id="acceptable-use" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Ban className="w-5 h-5 text-red-500" />
                </div>
                Acceptable Use Policy
              </h2>

              <div className="space-y-4">
                <p className="text-gray-600">You agree NOT to use the Service to:</p>

                <div className="space-y-3">
                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">Illegal Activity:</strong> Upload content that violates any applicable law or regulation
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">Non-Consensual Content:</strong> Upload chats without consent of all participants (unless legally exempt, e.g., evidence of crime)
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">Harmful Content:</strong> Upload content containing child exploitation, harassment, threats, or hate speech
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">System Abuse:</strong> Attempt to reverse engineer, hack, or interfere with our AI models or infrastructure
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">Fraud:</strong> Use stolen payment methods or attempt chargebacks for delivered services
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-700">
                      <strong className="text-red-700">Reselling:</strong> Resell or redistribute insights generated by our Service without written permission
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-700">Violation Consequences:</strong> We reserve the right to suspend or terminate accounts that violate this policy, with or without notice, and without refund.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: AI Disclaimer */}
            <section id="ai-disclaimer" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                AI-Generated Insights Disclaimer
              </h2>

              <div className="space-y-4 text-gray-600">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                  <p className="font-semibold text-gray-900 mb-2">IMPORTANT: AI Limitations</p>
                  <p className="text-sm">
                    All insights generated by RelivChats are created using artificial intelligence (Google Gemini) and should be treated as:
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Informational Only:</strong> Not a substitute for professional relationship counseling, therapy, or medical advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Probabilistic:</strong> AI analysis may contain errors, biases, or misinterpretations of context</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Limited Context:</strong> Based only on text data; cannot understand full relationship dynamics, tone, or non-verbal communication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Use at Your Own Risk:</strong> We are not liable for decisions made based on AI insights</span>
                  </li>
                </ul>

                <p className="text-sm font-semibold text-gray-900 mt-4">
                  If you're experiencing serious relationship issues, mental health concerns, or crisis situations, please consult a licensed professional.
                </p>
              </div>
            </section>

            {/* Section 7: Intellectual Property */}
            <section id="intellectual-property" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>

              <div className="space-y-5 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Content</h3>
                  <p className="text-sm">
                    All content on the RelivChats platform—including software, design, text, graphics, logos, and trademarks—is owned by RelivChats or its licensors and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Content</h3>
                  <p className="text-sm mb-2">
                    You retain all rights to the chat data you upload. By using the Service, you grant us a limited license to:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Process your chats to generate statistics and insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Store your data securely on our servers and third-party services (Qdrant)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Use anonymized, aggregated data to improve our AI models and services</span>
                    </li>
                  </ul>
                  <p className="text-sm mt-2 font-semibold">
                    This license ends when you delete your chat or account.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generated Insights</h3>
                  <p className="text-sm">
                    You may use insights generated for your personal, non-commercial purposes. Commercial use or redistribution requires written permission.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Payment Terms */}
            <section id="payment-terms" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Terms</h2>

              <div className="space-y-4 text-gray-600">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Processing</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Payments are processed securely via Razorpay or Stripe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>We accept major credit cards, debit cards, UPI, and net banking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>We do not store your payment card information</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Failures</h3>
                  <p className="text-sm">
                    If your payment is declined, credits will not be added to your account. Common reasons for payment failure include:
                  </p>
                  <ul className="space-y-1 text-sm mt-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Insufficient funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Incorrect card details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Bank or card issuer declining the transaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>3D Secure authentication failure</span>
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Contact your bank or try a different payment method if issues persist.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Taxes</h3>
                  <p className="text-sm">
                    All prices exclude applicable taxes (GST, VAT, sales tax). Taxes will be calculated and added at checkout based on your location.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Refunds</h3>
                  <p className="text-sm">
                    Please review our <Link href="/refunds" className="text-primary hover:underline font-semibold">Refund Policy</Link> for information about credit refunds and chargebacks.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Termination */}
            <section id="termination" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Termination</h2>

              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                  <p className="text-sm">
                    You may terminate your account at any time from your account settings. Upon termination, your data will be deleted within 30 days (see our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Rights</h3>
                  <p className="text-sm mb-2">
                    We may suspend or terminate your account immediately, without prior notice, if:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>You violate these Terms or our Acceptable Use Policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>We suspect fraudulent activity or payment disputes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Required by law or regulatory authority</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>Your account has been inactive for over 180 days</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-700">No Refunds on Termination:</strong> Unused credits are forfeited upon account termination (voluntary or involuntary), except where required by law.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: Warranty Disclaimer */}
            <section id="warranty" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Warranty Disclaimer</h2>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-xl">
                <p className="text-sm text-gray-700 uppercase font-semibold mb-3">
                  IMPORTANT LEGAL NOTICE
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Implied warranties of merchantability or fitness for a particular purpose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Accuracy, reliability, or completeness of AI-generated insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Uninterrupted, error-free, or secure operation of the Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Freedom from viruses, bugs, or other harmful components</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  We make no guarantees about specific outcomes, relationship improvements, or benefits from using the Service.
                </p>
              </div>
            </section>

            {/* Section 11: Limitation of Liability */}
            <section id="liability" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                Limitation of Liability
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-xl">
                  <p className="text-sm text-gray-600 mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, RELIVCHATS SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Any indirect, incidental, special, consequential, or punitive damages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Loss of profits, revenue, data, or business opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Relationship damage or emotional distress arising from AI insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Unauthorized access to your data due to security breaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>Service interruptions, bugs, or AI model errors</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-light rounded-xl p-5">
                  <p className="text-sm text-gray-700 font-semibold mb-2">
                    Maximum Liability Cap
                  </p>
                  <p className="text-sm text-gray-600">
                    Our total liability to you for any claims arising from the Service shall not exceed the amount you paid us in the 12 months preceding the claim, or $100 USD, whichever is greater.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12: Governing Law */}
            <section id="jurisdiction" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                Governing Law & Jurisdiction
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of <strong className="text-gray-900">India</strong>, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in <strong className="text-gray-900">Ratlam, Madhya Pradesh, India</strong>.
                </p>
                <p className="text-sm">
                  For international users: By using the Service, you consent to the jurisdiction of Indian courts and agree that Indian law governs these Terms.
                </p>
              </div>
            </section>

            {/* Section 13: Changes to Terms */}
            <section id="changes" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to These Terms</h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting the updated Terms on this page with a new "Last Updated" date.
                </p>
                <p>
                  For material changes, we will notify you via:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Email notification to your registered email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Prominent notice on the platform</span>
                  </li>
                </ul>
                <p>
                  Your continued use of the Service after changes constitutes acceptance of the updated Terms. If you do not agree, you must stop using the Service and delete your account.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="mb-6 text-white/90">
                If you have any questions or concerns about these Terms of Service, please contact us:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
