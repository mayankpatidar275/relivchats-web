import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { QueryProvider } from "../lib/query";
import ClerkClientWrapper from "../components/ClerkClientWrapper";
import Footer from "../components/layout/Footer";
import { ConfirmProvider } from "../hooks/useConfirm";
// import ClerkSyncData from "../components/ClerkSyncData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reliv Chats",
  description: "AI-powered chat insights platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  if (!backendUrl) {
    throw new Error(
      "Missing Backend URL. Please set EXPO_PUBLIC_BACKEND_URL in your .env"
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ClerkClientWrapper>
          <QueryProvider>
            {/* <ClerkSyncData> */}
            <ConfirmProvider>
              <Header />
              <main className="min-h-[60vh]">{children}</main>
              <Footer />
            </ConfirmProvider>
            {/* </ClerkSyncData> */}
          </QueryProvider>
        </ClerkClientWrapper>
      </body>
    </html>
  );
}
