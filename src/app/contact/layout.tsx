import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Reliv Chats",
  description: "Get in touch with Reliv Chats support team. We're here to help with technical issues, billing, privacy, and general inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
