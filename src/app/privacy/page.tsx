import { Shield, Lock, Eye, Database, Users, Globe, Download, Trash2, Clock, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Reliv Chats",
  description: "Learn how Reliv Chats collects, uses, and protects your personal information. GDPR and CCPA compliant privacy practices.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "information-collection", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "ai-processing", title: "AI Processing & Third-Party Services" },
    { id: "data-storage", title: "Data Storage & Security" },
    { id: "data-retention", title: "Data Retention" },
    { id: "your-rights", title: "Your Rights (GDPR/CCPA)" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "third-party", title: "Third-Party Disclosure" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">Legal Documents</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Your privacy is critically important to us. This policy explains how we collect, use, and protect your personal information.
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
            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600">Your data is encrypted in transit and at rest</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">GDPR Compliant</h3>
                <p className="text-sm text-gray-600">Full compliance with EU data protection laws</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transparent</h3>
                <p className="text-sm text-gray-600">Clear information about data usage</p>
              </div>
            </div>

            {/* Section 1: Information Collection */}
            <section id="information-collection" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Name and Email:</strong> Collected when you create an account via Clerk authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Profile Information:</strong> Optional profile picture and display name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Authentication Data:</strong> Login credentials managed securely by Clerk</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Chat Upload Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Chat Files:</strong> WhatsApp chat exports you upload for analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Message Content:</strong> Text messages, timestamps, participant names, and emojis from your chats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Metadata:</strong> Chat statistics (message count, word count, date ranges)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Billing Details:</strong> Name, email, and address for invoicing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Transaction Data:</strong> Purchase history and credit balance (payment card data is processed by Razorpay/Stripe and never stored on our servers)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Usage Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Analytics:</strong> Pages visited, features used, time spent on platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Device Information:</strong> Browser type, operating system, IP address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span><strong>Cookies:</strong> See our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section id="how-we-use" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                How We Use Your Information
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Service Delivery</h3>
                  <p className="text-gray-600 text-sm">Process your chat uploads, generate statistics, and create AI-powered insights based on your selected category</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Account Management</h3>
                  <p className="text-gray-600 text-sm">Maintain your account, process payments, manage credit balance, and provide customer support</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Platform Improvement</h3>
                  <p className="text-gray-600 text-sm">Analyze usage patterns to improve our AI models, user experience, and feature development (anonymized data only)</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                  <p className="text-gray-600 text-sm">Send important service updates, payment confirmations, and optional marketing communications (you can opt-out anytime)</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                  <p className="text-gray-600 text-sm">Comply with legal obligations, enforce our terms, and protect against fraudulent or illegal activity</p>
                </div>
              </div>
            </section>

            {/* Section 3: AI Processing & Third-Party Services */}
            <section id="ai-processing" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                AI Processing & Third-Party Services
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Google Gemini AI</h3>
                  <p className="text-gray-600 mb-2">We use Google's Gemini AI to generate relationship insights from your chat data. Your messages are:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Processed through Google's secure API with enterprise-grade encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Not used to train Google's AI models (contractual guarantee)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Not retained by Google after processing</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Qdrant Vector Database</h3>
                  <p className="text-gray-600 mb-2">Your chat messages are stored as encrypted vectors in Qdrant for efficient similarity search and context retrieval:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Hosted on secure cloud infrastructure with data encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Used only for providing personalized insights to you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span>Deleted when you delete your chat or account</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Clerk Authentication</h3>
                  <p className="text-gray-600 mb-2">Account authentication is managed by Clerk with SOC 2 Type II compliance</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Processors</h3>
                  <p className="text-gray-600 mb-2">Razorpay and Stripe handle all payment processing. They receive necessary billing information but never have access to your chat data</p>
                </div>
              </div>
            </section>

            {/* Section 4: Data Storage & Security */}
            <section id="data-storage" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                Data Storage & Security
              </h2>

              <div className="space-y-4">
                <div className="bg-primary-light rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span><strong>In Transit:</strong> All data transmitted using TLS 1.3 encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span><strong>At Rest:</strong> Chat data encrypted using AES-256 encryption</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Access Controls</h4>
                    <p className="text-sm text-gray-600">Role-based access with multi-factor authentication for team members</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Infrastructure</h4>
                    <p className="text-sm text-gray-600">Hosted on enterprise cloud providers with 99.9% uptime SLA</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Regular Audits</h4>
                    <p className="text-sm text-gray-600">Security assessments and vulnerability scans</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Backup & Recovery</h4>
                    <p className="text-sm text-gray-600">Automated daily backups with disaster recovery plan</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Data Retention */}
            <section id="data-retention" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                Data Retention
              </h2>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">90</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Inactive Chat Data</h3>
                    <p className="text-sm">Chats that haven't been accessed for 90 days are automatically archived and deleted unless you're an active subscriber</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">30</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Account Deletion</h3>
                    <p className="text-sm">When you delete your account, all your data is permanently deleted within 30 days (except legally required transaction records)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">7y</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Financial Records</h3>
                    <p className="text-sm">Payment and invoice data retained for 7 years for tax and legal compliance</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Your Rights (GDPR/CCPA) */}
            <section id="your-rights" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                Your Rights (GDPR/CCPA)
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Access & Export</h3>
                      <p className="text-sm text-gray-600">Download all your personal data in JSON format from your account settings</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Trash2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Delete</h3>
                      <p className="text-sm text-gray-600">Request complete deletion of your account and all associated data</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Rectify</h3>
                      <p className="text-sm text-gray-600">Correct inaccurate personal information in your profile</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Restrict Processing</h3>
                      <p className="text-sm text-gray-600">Limit how we use your data while maintaining your account</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Object</h3>
                      <p className="text-sm text-gray-600">Opt-out of marketing communications and non-essential data processing</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Data Portability</h3>
                      <p className="text-sm text-gray-600">Transfer your data to another service in machine-readable format</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-primary-light rounded-xl p-5">
                <p className="text-sm text-gray-700">
                  <strong>To exercise these rights:</strong> Email us at{" "}
                  <a href="mailto:privacy@relivchats.com" className="text-primary hover:underline font-semibold">
                    privacy@relivchats.com
                  </a>{" "}
                  or use the data controls in your account settings. We'll respond within 30 days.
                </p>
              </div>
            </section>

            {/* Section 7: Cookies & Tracking */}
            <section id="cookies" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies & Tracking</h2>

              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to provide functionality and improve your experience. See our detailed{" "}
                <Link href="/cookies" className="text-primary hover:underline font-semibold">Cookie Policy</Link> for complete information.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for authentication, session management, and core functionality (Clerk auth)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us understand how you use the platform (you can opt-out)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Preference Cookies</h4>
                    <p className="text-sm text-gray-600">Remember your settings and customization choices</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Third-Party Disclosure */}
            <section id="third-party" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Disclosure</h2>

              <p className="text-gray-600 mb-4">
                <strong>We do not sell, trade, or rent your personal data to third parties.</strong> We only share data with service providers necessary to operate our platform:
              </p>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Service Providers</h4>
                  <p className="text-sm text-gray-600">Google (AI processing), Qdrant (vector storage), Clerk (authentication), Razorpay/Stripe (payments)</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Legal Requirements</h4>
                  <p className="text-sm text-gray-600">When required by law, court order, or government request</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Business Transfers</h4>
                  <p className="text-sm text-gray-600">In event of merger, acquisition, or sale of assets (you'll be notified in advance)</p>
                </div>
              </div>
            </section>

            {/* Section 9: Children's Privacy */}
            <section id="children" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600">
                Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
                If you're a parent or guardian and believe your child has provided us with personal data, please contact us immediately and we will delete it.
              </p>
            </section>

            {/* Section 10: Changes to This Policy */}
            <section id="changes" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Posting the new policy on this page with an updated "Last Updated" date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Sending you an email notification (for significant changes)</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                Your continued use of the service after changes indicates acceptance of the updated policy.
              </p>
            </section>

            {/* Section 11: Contact Us */}
            <section id="contact" className="bg-linear-to-br from-primary to-primary-hover rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6 text-white/90">
                For privacy-related questions, concerns, or to exercise your rights:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <h3 className="font-semibold mb-3">Privacy Inquiries</h3>
                  <a href="mailto:privacy@relivchats.com" className="text-white hover:underline font-semibold">
                    privacy@relivchats.com
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <h3 className="font-semibold mb-3">General Support</h3>
                  <a href="mailto:mayankpatidar275@gmail.com" className="text-white hover:underline font-semibold">
                    mayankpatidar275@gmail.com
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <h3 className="font-semibold mb-3">Phone</h3>
                  <a href="tel:+918959050275" className="text-white hover:underline font-semibold">
                    +91 8959050275
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <h3 className="font-semibold mb-3">Mailing Address</h3>
                  <p className="text-sm text-white/90">
                    Mayank Patidar<br />
                    Dantodiya Village<br />
                    Ratlam, MP 457441, India
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Visit Contact Page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
