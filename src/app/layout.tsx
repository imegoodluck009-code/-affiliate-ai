import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Affiliate AI - Discover the Best Products with AI",
  description: "AI-powered affiliate marketing platform. Get personalized product recommendations, compare prices, and find the best deals.",
  keywords: ["AI product recommendations", "affiliate marketing", "product reviews", "best products", "smart shopping"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ 
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#0a192f",
        color: "#ffffff",
      }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
