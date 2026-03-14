import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Shield,
  CreditCard,
  Bug,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary via-primary-hover to-primary-deep text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-accent-pink rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6 py-16 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Have questions? Need support? We&apos;re here to help. Reach out
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:relivchats@gmail.com"
                      className="text-sm text-primary hover:underline"
                    >
                      relivchats@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+918959050275"
                      className="text-sm text-primary hover:underline"
                    >
                      +91 8959050275
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reliv Chats
                      <br />
                      Ratlam, Madhya Pradesh
                      <br />
                      India - 457441
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Support Hours
                    </h3>
                    <p className="text-sm text-gray-600">
                      Monday - Saturday
                      <br />
                      10:00 AM - 6:00 PM IST
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Email support available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Contact */}
            <div className="bg-primary-light rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">
                  Privacy Inquiries
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                For data protection, GDPR, or privacy-related questions:
              </p>
              <a
                href="mailto:relivchats@gmail.com"
                className="text-sm font-semibold text-primary hover:underline"
              >
                relivchats@gmail.com
              </a>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Response Time
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    General Inquiries
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    24-48 hrs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Technical Support
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    12-24 hrs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Urgent Issues</span>
                  <span className="text-sm font-semibold text-gray-900">
                    4-12 hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - TODO: enable when form submission backend is implemented */}
          {/*
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                Name, Email, Category, Subject, Message fields + Submit button
              </form>
            </div>
          </div>
          */}

          {/* Reach Out Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Reach Out to Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The best way to get in touch is by emailing us at{" "}
                <a
                  href="mailto:relivchats@gmail.com"
                  className="text-primary hover:underline font-semibold"
                >
                  relivchats@gmail.com
                </a>
                . We typically respond within 24–48 hours. You can also reach us
                by phone during support hours listed on the left.
              </p>
            </div>

            {/* Quick Help Categories */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Common Topics
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary transition-colors">
                  <div className="flex items-start gap-3">
                    <Bug className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Technical Issues
                      </h4>
                      <p className="text-sm text-gray-600">
                        Experiencing bugs or platform errors? Include your
                        browser, device, and error messages.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary transition-colors">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Billing Support
                      </h4>
                      <p className="text-sm text-gray-600">
                        Questions about payments or refunds? Include your
                        transaction ID or receipt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary transition-colors">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Privacy Concerns
                      </h4>
                      <p className="text-sm text-gray-600">
                        Data privacy or GDPR requests? Email us at
                        relivchats@gmail.com for faster response.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary transition-colors">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        General Questions
                      </h4>
                      <p className="text-sm text-gray-600">
                        Have questions about how RelivChats works? We&apos;re
                        happy to help explain!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
