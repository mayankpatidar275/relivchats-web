import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
});

const parseEnv = () => {
  const env = envSchema.safeParse({
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  });

  if (!env.success) {
    console.error(
      "❌ Invalid environment variables:",
      env.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  return env.data;
};

export const env = parseEnv();
