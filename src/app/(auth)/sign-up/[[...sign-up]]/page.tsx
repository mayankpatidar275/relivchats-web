import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-white to-accent-pink/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start Your Journey
          </h1>
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
          forceRedirectUrl="/dashboard?welcome=true" // always redirect here after sign in
          fallbackRedirectUrl="/dashboard?welcome=true" // used when there's no redirect_url in the URL
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
