// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/category(.*)",
  "/share(.*)",
  "/api/public(.*)",
]);

/**
 * Export a named `proxy` that uses Clerk's middleware.
 * Next.js 16+ prefers a `proxy` export (vs the old `middleware` filename).
 */
export const proxy = clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect(); // <-- call protect on the helper, not on await auth()
  }
});

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
