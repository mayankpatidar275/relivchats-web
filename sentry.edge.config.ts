// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
  replaysSessionSampleRate: IS_PRODUCTION ? 0.01 : 1.0,
  replaysOnErrorSampleRate: IS_PRODUCTION ? 0.1 : 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // Only in production with user consent
  sendDefaultPii: IS_PRODUCTION,

  // Ignore common errors
  ignoreErrors: [
    "top.GLOBALS",
    "canvas.contentDocument",
    "NetworkError",
    "Network request failed",
    "atomicFindClose",
  ],

  // Filter out transactions
  beforeSendTransaction(event) {
    if (event.transaction && event.transaction.includes("/health")) {
      return null;
    }
    return event;
  },
});
