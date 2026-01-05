// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: SENTRY_DSN,

  // Environment (production, development, staging)
  environment: process.env.NODE_ENV || "development",

  // Performance Monitoring - Sample rates based on environment
  // Production: 10% to reduce costs
  // Development: 100% for full visibility
  tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Profiling - Sample rates
  profilesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Session Replay - Sample rates
  // Production: 10% of errors, 1% of sessions
  // Development: 100% for debugging
  replaysSessionSampleRate: IS_PRODUCTION ? 0.01 : 1.0,
  replaysOnErrorSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // Only in production with user consent (Clerk provides user context)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: IS_PRODUCTION,

  // Ignore common errors that aren't actionable
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "canvas.contentDocument",
    // Network errors
    "NetworkError",
    "Network request failed",
    // Random plugins/extensions
    "atomicFindClose",
  ],

  // Filter out transactions we don't care about
  beforeSendTransaction(event) {
    // Don't send health checks to Sentry
    if (event.transaction && event.transaction.includes("/health")) {
      return null;
    }
    return event;
  },
});
