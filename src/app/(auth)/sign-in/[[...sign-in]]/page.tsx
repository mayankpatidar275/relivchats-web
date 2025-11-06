import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-white to-accent-pink/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to access your chat insights</p>
        </div>

        {/* Clerk Sign In Component */}
        <SignIn
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
          forceRedirectUrl="/dashboard" // always redirect here after sign in
          fallbackRedirectUrl="/dashboard" // used when there's no redirect_url in the URL
          signUpUrl="/sign-up"
        />

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-2xl border border-gray-100">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-xs text-gray-600">100% Secure</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-100">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-600">Instant Access</div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-100">
            <div className="text-2xl mb-2">🆓</div>
            <div className="text-xs text-gray-600">Free Stats</div>
          </div>
        </div>
      </div>
    </div>
  );
}
