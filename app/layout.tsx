import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { PostHogIdentity } from "@/components/posthog-identity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertex | Intelligent Learning",
  description: "Search your learning in plain English.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <PostHogIdentity />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}