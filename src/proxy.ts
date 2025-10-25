// proxy.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Export a named `proxy` that uses Clerk's middleware.
 * Next.js 16+ prefers a `proxy` export (vs the old `middleware` filename).
 */
export const proxy = clerkMiddleware();

/**
 * The matcher can stay the same as before.
 * It controls which routes the proxy runs on.
 */
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
