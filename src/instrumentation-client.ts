// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: SENTRY_DSN,

  // Environment (production, development, staging)
  environment: process.env.NODE_ENV || "development",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Performance Monitoring - Sample rates based on environment
  // Production: 10% to reduce costs
  // Development: 100% for full visibility
  tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Profiling
  profilesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Session Replay - Sample rates
  // Production: 1% of sessions, 10% of errors
  // Development: 100% for debugging
  replaysSessionSampleRate: IS_PRODUCTION ? 0.01 : 1.0,
  replaysOnErrorSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // Only in production with user consent (Clerk provides user context)
  sendDefaultPii: IS_PRODUCTION,

  // Ignore common errors that aren't actionable
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "canvas.contentDocument",
    // Network errors
    "NetworkError",
    "Network request failed",
    "Failed to fetch",
    // Random plugins/extensions
    "atomicFindClose",
    // ResizeObserver errors (harmless)
    "ResizeObserver loop limit exceeded",
  ],

  // Filter out transactions
  beforeSend(event) {
    // Don't send errors from browser extensions
    if (event.exception && event.exception.values) {
      const extensionErrors = event.exception.values.filter((exception) => {
        return exception.stacktrace?.frames?.some((frame) =>
          frame.filename?.includes("extension://")
        );
      });
      if (extensionErrors.length > 0) {
        return null;
      }
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
