import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-white to-accent-pink/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-primary to-accent-pink rounded-xl flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              Reliv Chats
            </span>
          </div> */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start Your Journey
          </h1>
          {/* <p className="text-gray-600">
            Get 50 free coins to unlock AI insights
          </p> */}
        </div>

        {/* Benefits Banner */}
        <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
              50
            </div>
            <div>
              <div className="font-bold text-green-900">
                Free Coins on Signup!
              </div>
              <div className="text-sm text-green-700">Unlock your insights</div>
            </div>
          </div>
        </div>

        {/* Clerk Sign Up Component */}
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-2 border-gray-100",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border-2 border-gray-200 hover:border-primary transition-all",
              formButtonPrimary:
                "bg-linear-to-r from-primary to-primary-hover hover:shadow-lg",
              footerActionLink: "text-primary hover:text-primary-hover",
            },
          }}
          forceRedirectUrl="/dashboard?welcome=true"
          signInUrl="/sign-in"
        />

        {/* What you get */}
        {/* <div className="mt-8 space-y-3">
          <div className="text-sm font-semibold text-gray-900 text-center mb-4">
            What you get:
          </div>
          {[
            { icon: "🎁", text: "50 free coins instantly" },
            { icon: "📊", text: "Unlimited free basic stats" },
            { icon: "🔒", text: "100% private and secure" },
            { icon: "✨", text: "AI-powered insights" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-700">{item.text}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
